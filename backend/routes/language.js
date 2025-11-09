const express = require("express");
const { create_language, get_languages, delete_language, update_language } = require("../controllers/languageController");
const authToken = require("../authorization/authorize");
const routes = express.Router();

routes.post("/create-language", authToken(["Admin"]), create_language);
routes.get("/get-all-languages", get_languages);
routes.delete("/delete-language/:id", authToken(["Admin"]), delete_language);
routes.patch("/update-language/:id", authToken(["Admin"]), update_language);

module.exports = routes;