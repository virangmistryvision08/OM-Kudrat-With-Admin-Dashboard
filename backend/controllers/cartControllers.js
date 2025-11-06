const { default: mongoose } = require("mongoose");
const Cart = require("../models/cartModel");

const get_all_carts = async (req, res) => {
  try {
    const userId = req.user._id;

    const findUser = await Cart.findOne({ userId });
    if (findUser) {
      const cartItems = await Cart.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $unwind: "$items" },
        {
          $lookup: {
            from: "products",
            localField: "items.productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $addFields: {
            totalItemPrice: {
              $multiply: ["$items.quantity", "$product.productNewPrice"],
            },
          },
        },
        {
          $group: {
            _id: "$userId",
            totalCartValue: { $sum: "$totalItemPrice" },
            products: {
              $push: {
                productId: "$product._id",
                productName: "$product.productName",
                productImage: "$product.productImage",
                productOldPrice: "$product.productOldPrice",
                productNewPrice: "$product.productNewPrice",
                quantity: "$items.quantity",
                subtotal: "$totalItemPrice",
              },
            },
          },
        },
      ]);

      return res.status(200).json({
        status: true,
        data: cartItems,
        message: "Get All Carts Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const add_to_cart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }
    await cart.save();

    res.status(200).json({ status: true, message: "Cart Added successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const incrementProductQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    let findUser = await Cart.findOne({ userId });
    if (!findUser) {
      findUser = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
      await findUser.save();
      return res.status(200).json({
        status: true,
        message: "Cart created and product added!",
      });
    }
    const itemIndex = findUser.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      findUser.items[itemIndex].quantity += 1;
    } else {
      findUser.items.push({ productId, quantity: 2 });
    }
    await findUser.save();
    return res.status(200).json({
      status: true,
      message: "Incremented product quantity!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const decrementProductQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const findUser = await Cart.findOne({ userId });
    if (findUser) {
      const findIndex = findUser.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (findIndex > -1) {
        findUser.items[findIndex].quantity -= 1;
        if (findUser.items[findIndex].quantity < 1) {
          const findProduct = findUser.items.find(
            (item) => item.productId.toString() === productId
          );

          findUser.items[findIndex].quantity = 1;

          findUser.items = await findUser.items.filter(
            (item) => item.productId !== findProduct.productId
          );
        }
        res.status(200).json({ status: true, message: "Decrement Quantity!" });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Product Not In Cart!" });
      }
    }
    await findUser.save();
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const remove_Cart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    let findUser = await Cart.findOne({ userId });
    if (findUser) {
      const findProduct = findUser.items.find(
        (item) => item.productId.toString() === productId
      );
      findUser.items = await findUser.items.filter(
        (item) => item.productId !== findProduct.productId
      );
      res
        .status(200)
        .json({ status: true, message: "Product Remove From The Cart!" });
    }
    await findUser.save();
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const checkout = async (req, res) => {
  try {
    const { cartItems, userId } = req.body;

    const amount = cartItems.reduce((sum, item) => {
      return sum + item.product.productPrice * item.quantity;
    }, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId: userId,
      },
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET_KEY
    );
  } catch (err) {
    console.log("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;

    console.log("Payment succeeded for:", userId);

    await Order.create({
      orderId: paymentIntent.id,
      email: paymentIntent.receipt_email || "",
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: "completed",
      createdAt: new Date(),
    });

    await Cart.findOneAndDelete({ userId });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;

    const order = new Order({
      orderId: session.id,
      email: session.customer_details.email,
      amount: session.amount_total / 100,
      currency: session.currency,
      status: "completed",
      createdAt: new Date(),
    });
    await order.save();
    await Cart.findOneAndDelete({ userId });
  }
  res.status(200).send();
};

const confirm_order = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  return res.status(200).json({
    status: true,
    data: orders,
    message: "Get All Completed Order Successfully!",
  });
};

module.exports = {
  get_all_carts,
  add_to_cart,
  incrementProductQuantity,
  decrementProductQuantity,
  remove_Cart,
  checkout,
  webhook,
  confirm_order,
};
