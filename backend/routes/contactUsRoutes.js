const express = require("express");
const authToken = require("../authorization/authorize");
const { create_question, get_all_questions, update_question, delete_question, get_one_question } = require("../controllers/contactUsControllers");
const routes = express.Router();

routes.get("/get-questions", authToken(["Admin"]), get_all_questions);
routes.post("/add-question", create_question);
routes.get("/get-one-question/:id", authToken(["Admin"]), get_one_question);
routes.patch("/update-question/:id", authToken(["Admin"]), update_question);
routes.delete("/delete-question/:id", authToken(["Admin"]), delete_question);

module.exports = routes;