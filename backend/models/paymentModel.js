import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    
  },
  razorpay_payment_id: {
    type: String,
    
  },
  razorpay_signature: {
    type: String,
   
  },
  visitorName: {
    type: String
  },
  visitorEmail: {
    type: String
  },
  visitorContact: {
    type: String
  },
  selectedDate: {
    type: String,
  },
  count: {
    type: String,
  },
  rideName: {
    type: String,
  },
  product_id: {
    type: String,
  },
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
    default: "pending",
  }
});

export const Payment = mongoose.model("Payment", paymentSchema);