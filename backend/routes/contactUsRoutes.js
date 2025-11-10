const express = require("express");
const authToken = require("../authorization/authorize");
const { create_question, get_all_questions } = require("../controllers/contactUsControllers");
const routes = express.Router();

routes.get("/get-questions", authToken(["Admin"]), get_all_questions);
routes.post("/add-question", create_question);

module.exports = routes;