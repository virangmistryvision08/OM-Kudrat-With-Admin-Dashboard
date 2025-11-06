const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      [name, email, password].some((item) => item === "" || item === undefined)
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All Field Is Required!" });
    }
    const verifyEmail = await User.findOne({ email });
    if (verifyEmail) {
      return res.status(400).json({
        status: false,
        message: "This Email Already Registered Please Login!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ status: true, message: "Register Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      [name, email, password].some((item) => item === "" || item === undefined)
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All Field Is Required!" });
    }
    const findUser = await User.findOne({ name, email });
    if (!findUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Name or Email!" });
    }
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Password!" });
    }
    const token = jwt.sign(
      {
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res
      .status(200)
      .json({ status: true, token: token, message: "Login Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const verify_email = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || email.trim() === "") {
      return res
        .status(400)
        .json({ status: false, message: "Email is required!" });
    }

    const findEmail = await User.findOne({ email });
    if (!findEmail) {
      return res.status(400).json({
        status: false,
        message: "Invalid email, Please register first!",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
    const verificationCode = Math.floor(1000 + Math.random() * 9000);

    const htmlPath = path.join(__dirname, "../emailPage.html");
    let htmlPage = fs.readFileSync(htmlPath, "utf-8");

    htmlPage = htmlPage
      .replace(/{{name}}/g, findEmail.name || "User")
      .replace(/{{verificationCode}}/g, verificationCode)
      .replace(/{{appName}}/g, "OM Kudrat")
      .replace(/{{userId}}/g, findEmail._id)
      .replace(/{{year}}/g, new Date().getFullYear());

    // send the email
    const info = await transporter.sendMail({
      from: `"OM Kudrat" <${process.env.EMAIL}>`,
      to: findEmail.email,
      subject: "Email Verification Code",
      html: htmlPage,
    });

    await findEmail.updateOne(
      { otp: verificationCode, otpExpiresIn: Date.now() + 1000 * 60 * 5 },
      { new: true }
    );
    console.log("✅ Email sent:", info.messageId);

    return res.status(200).json({
      status: true,
      id: findEmail._id,
      message: `Sent OTP On ${findEmail.email}.`,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const verify_otp = async (req, res) => {
  try {
    const { otp } = req.body;
    const { id } = req.params;
    if (!otp) {
      return res
        .status(400)
        .json({ status: false, message: "OTP is required!" });
    }
    const findUser = await User.findOne({ _id: id });
    if (!findUser) {
      return res
        .status(404)
        .json({ status: false, message: "User Not Found!" });
    }
    const otpVerification = await User.findOne({
      $and: [{ otp }, { otpExpiresIn: { $gt: Date.now() } }],
    });
    if (!otpVerification) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid OTP or Expired!" });
    }
    await findUser.updateOne({ otp: null, otpExpiresIn: null }, { new: true });
    return res.status(200).json({
      status: true,
      message: "OTP Verify Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const forgot_password = async (req, res) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;
    const { id } = req.params;
    const findUser = await User.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!findUser) {
      return res
        .status(404)
        .json({ status: false, message: "User Not Found!" });
    }
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Password Does't Matched!" });
    }
    const hashedPassword = await bcrypt.hash(
      newPassword,
      +process.env.SALT_ROUND
    );
    await findUser.updateOne({ password: hashedPassword });
    return res.status(200).json({
      status: true,
      message: "Password Change Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_all_users = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $match: { role: { $ne: "Admin" } },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    if (users.length === 0) {
      return res.status(400).json({
        status: false,
        data: users,
        message: "Empty Users!",
      });
    }
    return res.status(200).json({
      status: true,
      data: users,
      message: "users Fetched Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  verify_email,
  verify_otp,
  forgot_password,
  get_all_users,
};
