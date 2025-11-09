const express = require("express");
const { create_category, get_categories, delete_category, update_category } = require("../controllers/categoryController");
const authToken = require("../authorization/authorize");
const routes = express.Router();

routes.post("/create-category", authToken(["Admin"]), create_category);
routes.get("/get-all-categories", get_categories);
routes.delete("/delete-category/:id", authToken(["Admin"]), delete_category);
routes.patch("/update-category/:id", authToken(["Admin"]), update_category);

module.exports = routes;