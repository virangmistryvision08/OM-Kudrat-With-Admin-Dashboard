const mongoose = require("mongoose");

// MongoDB Order Schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  orderId: {
    type: String,
    unique: true,
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

orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const count = await mongoose.model("Order").countDocuments();
    this.orderId = `ORD-${new Date().getFullYear()}-${String(count + 1).padStart(5, "0")}`;
  }
  next();
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
