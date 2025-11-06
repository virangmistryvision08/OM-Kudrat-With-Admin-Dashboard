const express = require("express");
const { register, login, verify_email, verify_otp, forgot_password, get_all_users } = require("../controllers/authControllers");
const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.post("/verify-email", verify_email);
routes.post("/verify-otp/:id", verify_otp);
routes.post("/reset-password/:id", forgot_password);
routes.get("/get-all-users", get_all_users);

module.exports = routes;