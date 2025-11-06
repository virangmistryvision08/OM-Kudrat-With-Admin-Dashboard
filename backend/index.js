require("./config/dbConnect");
require("dotenv").config();
const express = require("express");
const app = express();
const port = +process.env.PORT;
const cors = require("cors");
const auth = require("./routes/auth");
const product = require("./routes/product");
const category = require("./routes/category");
const language = require("./routes/language");
const cart = require("./routes/cart");
const wishlist = require("./routes/wishlist");
const paymentRoutes = require("./routes/paymentRoutes");
const stripeWebhook = require("./routes/stripeWebhook");
const blog = require("./routes/blogRoute");
const admin = require("./routes/adminRoutes");
const orders = require("./routes/orderRoutes");

app.use("/api/payment/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(cors());
app.use(express.json());
app.use("/product", express.static("public"));

app.use("/auth", auth);
app.use("/product", product);
app.use("/category", category);
app.use("/language", language);
app.use("/cart", cart);
app.use("/wishlist", wishlist);
app.use("/api/payment", paymentRoutes);
app.use("/blog", blog);
app.use("/admin", admin);
app.use("/orders", orders);

app.listen(port, () => {
  console.log("Server Started At PORT -", port);
});
