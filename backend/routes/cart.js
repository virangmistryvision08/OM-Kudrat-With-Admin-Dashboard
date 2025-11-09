const express = require("express");
const { get_all_carts, add_to_cart, incrementProductQuantity, decrementProductQuantity, remove_Cart, clear_Cart, checkout, confirm_order } = require("../controllers/cartControllers");
const authToken = require("../authorization/authorize");
const routes = express.Router();

routes.get("/get-all-carts", authToken(["Admin", "User"]), get_all_carts);
routes.post("/add-in-cart/:productId", authToken(["Admin", "User"]), add_to_cart);
routes.post("/increment-quantity/:productId", authToken(["Admin", "User"]), incrementProductQuantity);
routes.post("/decrement-quantity/:productId", authToken(["Admin", "User"]), decrementProductQuantity);
routes.delete("/remove-from-cart/:productId", authToken(["Admin", "User"]), remove_Cart);

routes.post("/create-payment-intent", authToken(["Admin", "User"]), checkout);
routes.get("/confirmed-orders", authToken(["Admin", "User"]), confirm_order);


module.exports = routes;