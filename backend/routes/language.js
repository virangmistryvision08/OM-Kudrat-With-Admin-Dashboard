const express = require("express");
const { create_language, get_languages, delete_language, update_language } = require("../controllers/languageController");
const routes = express.Router();

routes.post("/create-language", create_language);
routes.get("/get-all-languages", get_languages);
routes.delete("/delete-language/:id", delete_language);
routes.patch("/update-language/:id", update_language);

module.exports = routes;