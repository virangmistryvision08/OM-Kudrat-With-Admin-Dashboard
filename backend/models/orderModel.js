const mongoose = require("mongoose");

// MongoDB Order Schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  email: String,
  billingDetails: Object,
  deliveryDetails: Object,
  cartProducts: Array,
  amount: Number,
  paymentIntentId: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
