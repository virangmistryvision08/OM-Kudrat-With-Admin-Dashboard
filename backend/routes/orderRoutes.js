const express = require("express");
const { get_all_orders } = require("../controllers/orderControllers");
const authToken = require("../authorization/authorize");
const routes = express.Router();

routes.get("/get-all-orders", authToken(["Admin"]), get_all_orders);

module.exports = routes;