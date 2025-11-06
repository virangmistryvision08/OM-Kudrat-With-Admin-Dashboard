const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/orderModel");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create PaymentIntent
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency, userId, billingDetails, cartProducts, deliveryDetails } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    // Create a temporary order record in MongoDB (unpaid)
    const newOrder = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      email: billingDetails?.email || "",
      billingDetails,
      deliveryDetails,
      cartProducts,
      amount,
      status: "pending",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ["card"],
      metadata: {
        orderId: newOrder._id.toString(),
        userId: newOrder.userId.toString(),
        billingDetails: JSON.stringify(billingDetails),
        deliveryDetails: JSON.stringify(deliveryDetails),
      },
    });
    newOrder.paymentIntentId = paymentIntent.id;
    await newOrder.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
