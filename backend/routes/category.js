const express = require("express");
const { create_category, get_categories, delete_category, update_category } = require("../controllers/categoryController");
const routes = express.Router();

routes.post("/create-category", create_category);
routes.get("/get-all-categories", get_categories);
routes.delete("/delete-category/:id", delete_category);
routes.patch("/update-category/:id", update_category);

module.exports = routes;