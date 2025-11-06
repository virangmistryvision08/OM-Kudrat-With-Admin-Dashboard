const { default: mongoose } = require("mongoose");
const Language = require("../models/languageModel");
const Products = require("../models/productModal");

const create_language = async (req, res) => {
  try {
    const { languageName } = req.body;
    await Language.create({ languageName });
    return res
      .status(201)
      .json({ status: true, message: "Language Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_languages = async (req, res) => {
  try {
    const languages = await Language.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return res.status(200).json({
      status: true,
      data: languages,
      message: "Languages Fetched Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const delete_language = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify Language To link onethr table or not
    const verify_language_link_on_product = await Products.findOne({
      language: new mongoose.Types.ObjectId(id),
    });
    if (verify_language_link_on_product) {
      return res.status(400).json({
        status: false,
        message: "Language Was Link To The Other Table You Can't Delete It!",
      });
    } else {
      const language = await Language.findByIdAndDelete({ _id: id });
      if (!language) {
        return res.status(404).json({
          status: false,
          message: "language Not Found!",
        });
      }

      return res.status(200).json({
        status: true,
        message: "language Deleted Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const update_language = async (req, res) => {
  try {
    const { id } = req.params;
    const { languageName } = req.body;
    const language = await Language.findOne({ _id: id });
    if (!language) {
      return res.status(404).json({
        status: false,
        message: "Language Not Found!",
      });
    }
    if (languageName === "" || languageName === undefined) {
      return res.status(400).json({
        status: false,
        message: "Required language!",
      });
    }
    await language.updateOne({ languageName });
    return res.status(200).json({
      status: true,
      message: "language Update Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  create_language,
  get_languages,
  delete_language,
  update_language,
};
