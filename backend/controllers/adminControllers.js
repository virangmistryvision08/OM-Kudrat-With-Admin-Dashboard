const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((item) => item === "" || item === undefined)) {
      return res
        .status(400)
        .json({ status: false, message: "All Field Is Required!" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ status: false, message: "Invalid Email!" });
    }
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Password!" });
    }
    if (findUser.role === "Admin") {
      const token = jwt.sign(
        {
          _id: findUser._id,
          name: findUser.name,
          email: findUser.email,
          role: findUser.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      return res
        .status(200)
        .json({ status: true, token: token, message: "Login Successfully!" });
    }
    return res
      .status(401)
      .json({ status: false, message: "UnAuthor User!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  signin,
};
