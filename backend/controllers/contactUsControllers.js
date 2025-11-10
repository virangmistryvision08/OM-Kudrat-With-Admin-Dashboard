const ContactUs = require("../models/contactUsModel");

const get_all_questions = async (req, res) => {
  try {
    const questions = await ContactUs.find();
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "Empty Questions!" });
    }
    res.status(200).json({
      status: true,
      data: questions,
      message: "Fetched All Questions Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const create_question = async (req, res) => {
  try {
    const { name, email, question } = req.body;
    if (
      [name, email, question].some((item) => item === "" || item === undefined)
    ) {
      res.status(400).json({
        status: false,
        message: "All Field Required!",
      });
    }

    await ContactUs.create({ name, email, question });

    res.status(201).json({
      status: true,
      message: "Question Created.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  get_all_questions,
  create_question,
};
