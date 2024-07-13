import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  visitorName: {
    type: String,
    required: true,
  },
  visitorEmail: {
    type: String,
    required: true,
  },
  visitorContact: {
    type: String,
    required: true,
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
  amount: {
    type: String,
    
  },
  cart: {
    type: Array,  // Assuming each item in cart is an object
    default: [],
  },
  status: {
    type: String,
    default: "pending",
  }
});

export const Order = mongoose.model('Order', orderSchema);
