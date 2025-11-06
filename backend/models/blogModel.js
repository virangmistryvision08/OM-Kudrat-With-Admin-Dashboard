const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogName: String,
    blogImage: String,
    shortDescription: String,
    createdAt: { type: Date, default: Date.now },
    htmlContent: String,
    by: {type: String, default : "Omkudrat.com"}
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
