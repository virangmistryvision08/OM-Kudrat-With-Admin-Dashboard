const express = require("express");
const { get_dashboard_stats } = require("../controllers/dashboardController");
const routes = express.Router();

routes.get("/stats", get_dashboard_stats);

module.exports = routes;