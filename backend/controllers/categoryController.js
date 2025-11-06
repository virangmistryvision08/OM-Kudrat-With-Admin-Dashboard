const { default: mongoose } = require("mongoose");
const Category = require("../models/categoryModel");
const Products = require("../models/productModal");

const create_category = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (categoryName === "" || categoryName === undefined) {
      return res.status(400).json({
        status: false,
        message: "Required Category!",
      });
    }
    await Category.create({ categoryName });
    return res
      .status(201)
      .json({ status: true, message: "Category Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_categories = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return res.status(200).json({
      status: true,
      data: categories,
      message: "Category Fetched Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const delete_category = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify Category To link onethr table or not
    const verify_category_link_on_product = await Products.findOne({
      category: new mongoose.Types.ObjectId(id),
    });
    console.log(verify_category_link_on_product,'verify')
    if (verify_category_link_on_product) {
      return res.status(400).json({
        status: false,
        message: "Category Was Link To The Other Table You Can't Delete It!",
      });
    } else {
      const category = await Category.findByIdAndDelete({ _id: id });
      if (!category) {
        return res.status(404).json({
          status: false,
          message: "Category Not Found!",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Category Deleted Successfully!",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const update_category = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category Not Found!",
      });
    }
    if (categoryName === "" || categoryName === undefined) {
      return res.status(400).json({
        status: false,
        message: "Required Category!",
      });
    }
    await category.updateOne({ categoryName });
    return res.status(200).json({
      status: true,
      message: "Category Update Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  create_category,
  get_categories,
  delete_category,
  update_category,
};
