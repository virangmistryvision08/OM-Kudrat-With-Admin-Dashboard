const { default: mongoose } = require("mongoose");
const Products = require("../models/productModal");
const Order = require("../models/orderModel");

const create_product = async (req, res) => {
  try {
    const {
      productName,
      productOldPrice,
      productNewPrice,
      category,
      language,
      productType,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "Product Image Is Required!" });
    }

    const verifyProduct = await Products.findOne({ productName });
    if (verifyProduct) {
      return res.status(400).json({
        status: false,
        message: "This Product Already Exist!",
      });
    }
    await Products.create({
      productImage: `${process.env.BACKEND_URL}/product/products/${req.file.filename}`,
      productName,
      productOldPrice,
      productNewPrice,
      category,
      language,
      productType,
    });
    return res
      .status(201)
      .json({ status: true, message: "Product Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_all_products = async (req, res) => {
  try {
    let { page } = req.query;
    const {
      category,
      languageId,
      productName,
      productOldPrice,
      productNewPrice,
      productNameAss,
      productNameDiss,
      productPriceAss,
      productPriceDiss,
      productIds,
      productLimit,
    } = req.query;

    page = +page || 1;
    const limit = productLimit ? +productLimit : 5;
    const skip = (page - 1) * limit;

    const matchStage = {};

    if (productIds) {
      const idsArray = productIds
        .split(",")
        .filter((id) => mongoose.Types.ObjectId.isValid(id))
        .map((id) => new mongoose.Types.ObjectId(id));
      matchStage._id = { $in: idsArray };
    }

    if (productName) {
      matchStage.productName = { $regex: productName, $options: "i" };
    }

    if (productNewPrice) {
      matchStage.productNewPrice = {
        $gte: +productOldPrice,
        $lte: +productNewPrice,
      };
    }

    let sort = {};

    if (productNameAss || productNameDiss) {
      sort.productName = productNameAss ? 1 : -1;
    }

    if (productPriceAss || productPriceDiss) {
      sort.productNewPrice = productPriceAss ? 1 : -1;
    }

    if (Object.keys(sort).length === 0) {
      sort.createdAt = -1;
    }

    const productsResult = await Products.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "languages",
          localField: "language",
          foreignField: "_id",
          as: "language",
        },
      },
      { $unwind: "$language" },
      {
        $addFields: {
          categoryName: "$category.categoryName",
          languageName: "$language.languageName",
          categoryId: "$category._id",
          languageId: "$language._id",
        },
      },
      {
        $match: {
          ...matchStage,
          ...(languageId && mongoose.Types.ObjectId.isValid(languageId)
            ? { languageId: new mongoose.Types.ObjectId(languageId) }
            : {}),
          ...(category && mongoose.Types.ObjectId.isValid(category)
            ? { categoryId: new mongoose.Types.ObjectId(category) }
            : {}),
        },
      },
      {
        $sort: sort,
      },
      {
        $project: {
          category: 0,
          language: 0,
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalProducts: [{ $count: "count" }],
        },
      },
    ]);

    const products = productsResult[0]?.data || [];
    const totalProducts = productsResult[0]?.totalProducts[0]?.count || 0;
    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      status: true,
      data: products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
      message: "Fetched All Products successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_all_filtered_products = async (req, res) => {
  try {
    const products = await Products.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },

      {
        $lookup: {
          from: "languages",
          localField: "language",
          foreignField: "_id",
          as: "language",
        },
      },
      { $unwind: "$language" },

      {
        $group: {
          _id: "$category.categoryName",
          products: {
            $push: {
              productId: "$_id",
              productName: "$productName",
            },
          },
          allLanguages: {
            $addToSet: {
              languageId: "$language._id",
              languageName: "$language.languageName",
            },
          },
        },
      },

      {
        $group: {
          _id: null,
          categories: {
            $push: {
              categoryName: "$_id",
              products: "$products",
            },
          },
          languages: {
            $addToSet: "$allLanguages",
          },
        },
      },

      {
        $project: {
          _id: 0,
          categories: 1,
          languages: {
            $reduce: {
              input: "$languages",
              initialValue: [],
              in: { $setUnion: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);

    if (!products.length) {
      return res.status(404).json({
        status: false,
        message: "No products match your filter.",
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      message: "Fetched filtered products successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const get_one_product = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Product ID" });
    }

    const product = await Products.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "languages",
          localField: "language",
          foreignField: "_id",
          as: "language",
        },
      },
      { $unwind: "$language" },
      {
        $addFields: {
          categoryName: "$category.categoryName",
          languageName: "$language.languageName",
        },
      },
      {
        $project: {
          category: 0,
          language: 0,
          categoryId: 0,
          languageId: 0,
        },
      },
    ]);

    if (!product || product.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Product Not Found!",
      });
    }

    return res.status(200).json({
      status: true,
      data: product[0],
      message: "Fetched One Product Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_all_product = async (req, res) => {
  try {
    const products = await Products.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryinfo",
        },
      },
      {
        $unwind: "$categoryinfo",
      },
      {
        $addFields: {
          categoryName: "$categoryinfo.categoryName",
        },
      },
      {
        $project: {
          categoryinfo: 0,
        },
      },
    ]);
    if (products.length === 0) {
      return res.status(400).json({
        status: false,
        message: "Empty Products!",
      });
    }
    return res.status(200).json({
      status: true,
      data: products,
      message: "Fetch All Products Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_top_four_trending_products = async (req, res) => {
  try {
    const products = await Order.aggregate([
      [
        {
          $unwind: "$cartProducts",
        },
        {
          $group: {
            _id: "$cartProducts.productId",
            productName: { $first: "$cartProducts.productName" },
            productImage: { $first: "$cartProducts.productImage" },
            productOldPrice: { $first: "$cartProducts.productOldPrice" },
            productNewPrice: { $first: "$cartProducts.productNewPrice" },
            totalOrder: { $sum: 1 },
          },
        },
        {
          $addFields: {
            productId: { $toObjectId: "$_id" },
          },
        },
        {
          $sort: {
            totalOrder: -1,
          },
        },
        {
          $limit: 4,
        },
      ],
    ]);

    if (!products || products.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Product Not Found!",
      });
    }

    return res.status(200).json({
      status: true,
      data: products,
      message: "Fetched All Trending Products Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const update_product = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productNewPrice, category, language } = req.body;

    const findProduct = await Products.findOne({ _id: id });

    if (!findProduct) {
      return res.status(404).json({
        status: false,
        message: "Product Not Found!",
      });
    }
    await findProduct.updateOne({
      productImage: `${
        !req.file
          ? findProduct.productImage
          : `${process.env.BACKEND_URL}/product/products/${req.file.filename}`
      }`,
      productName,
      productNewPrice,
      category,
      language,
    });
    return res
      .status(200)
      .json({ status: true, message: "Product Updated Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const delete_product = async (req, res) => {
  try {
    const { id } = req.params;

    const findProduct = await Products.findOneAndDelete({ _id: id });

    if (!findProduct) {
      return res.status(404).json({
        status: false,
        message: "Product Not Found!",
      });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  create_product,
  get_all_products,
  get_all_filtered_products,
  get_one_product,
  get_all_product,
  get_top_four_trending_products,
  update_product,
  delete_product,
};
