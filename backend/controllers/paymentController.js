import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import { Order } from "../models/orderModel.js"; 

export const checkout = async (req, res) => {
  const { amount, cart, visitorName, visitorEmail, visitorContact, selectedDate, count, rideName } = req.body;

  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  if (cart && cart.length > 0) {
    // Handle cart-based order
    const newOrder = await Order.create({
      order_id: order.id,
      visitorName,
      visitorEmail,
      visitorContact,
      amount,
      cart
    });

    // Log each cart item in the database
    const cartItems = cart.map(item => ({
      razorpay_order_id: order.id,
      product_id: item.product_id,
      productName: item.productName,
      count: item.count,
      price: item.price,
      selectedDate: item.selectedDate,
      visitorName,
      visitorEmail,
      visitorContact,
    }));

    // Save cart items to the database
    await Payment.insertMany(cartItems);
  } else {
    // Handle single item order
    await Order.create({
      order_id: order.id,
      visitorName,
      visitorEmail,
      visitorContact,
      selectedDate,
      count,
      rideName,
      amount
    });
  }

  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const order = await Order.findOne({ order_id: razorpay_order_id });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.updateOne({ order_id: razorpay_order_id }, { status: "paid" });
    // console.log(order);
    if (order.cart && order.cart.length > 0) {
      // console.log("Inside if order");
      // Update status for cart items
      await Payment.updateMany(
        { razorpay_order_id: razorpay_order_id },
        { status: "paid" }
      );
    } else {
      // Update status for single item
      const payment = await Payment.findOne({ razorpay_order_id: razorpay_order_id });
      if (!payment) {
        await Payment.create({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          visitorName: order.visitorName,
          visitorEmail: order.visitorEmail,
          visitorContact: order.visitorContact,
          selectedDate: order.selectedDate,
          count: order.count,
          rideName: order.rideName,
          price: order.amount, // Ensure amount is included
          status: "paid" // Ensure status is set to paid
        });
      } else {
        await Payment.updateOne({ razorpay_order_id: razorpay_order_id }, { 
          razorpay_payment_id,
          razorpay_signature,
          status: "paid"
        });
      }
    }

    // res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_order_id}`);

  } else {
    res.status(400).json({
      success: false,
    });
  }
};
