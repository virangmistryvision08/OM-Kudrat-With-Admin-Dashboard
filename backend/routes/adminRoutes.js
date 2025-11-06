const express = require("express");
const { signin } = require("../controllers/adminControllers");
const routes = express.Router();

routes.post("/signin", signin);

module.exports = routes;