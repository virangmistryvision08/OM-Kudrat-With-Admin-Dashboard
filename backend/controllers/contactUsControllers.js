const ContactUs = require("../models/contactUsModel");

const get_all_questions = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = +page || 1;
    limit = +limit || 5;
    const skip = (page - 1) * limit;

    const questionsResult = await ContactUs.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalQuestions: [{ $count: "count" }],
        },
      },
    ]);

    const questions = questionsResult[0]?.data || [];
    const totalQuestions = questionsResult[0]?.totalQuestions[0]?.count || 0;
    const totalPages = Math.ceil(totalQuestions / limit);

    return res.status(200).json({
      status: true,
      data: questions,
      pagination: {
        totalQuestions,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
      message: "Fetched All Questions successfully!",
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
      message: "Question Added.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_one_question = async (req, res) => {
  try {
    const { id } = req.params;
    const findQuestion = await ContactUs.findOne({ _id: id });

    if (!findQuestion) {
      res.status(404).json({
        status: true,
        message: "Question Not Found!",
      });
    }
    res.status(200).json({
      status: true,
      data: findQuestion,
      message: "Get Question Successfully!.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
}

const update_question = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, question } = req.body;
    if (
      [name, email, question].some((item) => item === "" || item === undefined)
    ) {
      res.status(400).json({
        status: false,
        message: "All Field Required!",
      });
    }

    const findQuestion = await ContactUs.findOne({ _id: id });

    if (!findQuestion) {
      res.status(404).json({
        status: true,
        message: "Question Not Found!",
      });
    }

    await findQuestion.updateOne({ name, email, question });

    res.status(200).json({
      status: true,
      message: "Question Updated.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const delete_question = async (req, res) => {
  try {
    const { id } = req.params;

    const findQuestion = await ContactUs.findOneAndDelete({ _id: id });

    if (!findQuestion) {
      res.status(404).json({
        status: true,
        message: "Question Not Found!",
      });
    }

    res.status(200).json({
      status: true,
      message: "Question Deleted.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  get_all_questions,
  create_question,
  get_one_question,
  update_question,
  delete_question,
};
