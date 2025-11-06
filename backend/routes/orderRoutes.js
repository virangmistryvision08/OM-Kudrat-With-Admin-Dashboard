const express = require("express");
const { get_all_orders } = require("../controllers/orderControllers");
const routes = express.Router();

routes.get("/get-all-orders", get_all_orders);

module.exports = routes;