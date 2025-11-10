const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productImage: { type: String },
    productName: { type: String },
    productOldPrice: { type: Number },
    productNewPrice: { type: Number },
    isSale: { type: Boolean, default: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
    },
    productType: { type: String },
    slug: { type: String },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
