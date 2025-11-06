const express = require("express");
const { get_all_wishlists, toggle_wishlist } = require("../controllers/wishlistController");
const authToken = require("../authorization/authorize");
const routes = express.Router();

routes.get("/get-all-wishlists", authToken, get_all_wishlists);
routes.post("/toggle-wishlist/:productId", authToken, toggle_wishlist);

module.exports = routes;