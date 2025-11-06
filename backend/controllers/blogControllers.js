const { default: mongoose } = require("mongoose");
const Blog = require("../models/blogModel");

const create_blog = async (req, res) => {
  try {
    const { blogName, htmlContent, by } = req.body;
    if (
      [blogName, htmlContent].some(
        (item) => item === "" || item === undefined
      )
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All Field Is Required!" });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "Blog Image Is Required!" });
    }

    const verifyBlog = await Blog.findOne({ blogName });
    if (verifyBlog) {
      return res.status(400).json({
        status: false,
        message: "Blog Already Exist!",
      });
    }

    await Blog.create({
      blogName,
      blogImage: `${process.env.BACKEND_URL}/product/blogs/${req.file.filename}`,
      htmlContent,
      by,
    });
    return res
      .status(201)
      .json({ status: true, message: "Blog Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_all_blogs = async (req, res) => {
  try {
    let { page, blogNameAss, blogNameDiss, blogLimit } = req.query;

    page = +page || 1;
    const limit = blogLimit ? +blogLimit : 5;
    const skip = (page - 1) * limit;

    let sort = {};

    if (blogNameAss || blogNameDiss) {
      sort.blogName = blogNameAss ? 1 : -1;
    }

    if (Object.keys(sort).length === 0) {
      sort.createdAt = -1;
    }

    const blogsResult = await Blog.aggregate([
      {
        $sort: sort,
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalBlogs: [{ $count: "count" }],
        },
      },
    ]);

    const blogs = blogsResult[0]?.data || [];
    const totalBlogs = blogsResult[0]?.totalBlogs[0]?.count || 0;
    const totalPages = Math.ceil(totalBlogs / limit);

    return res.status(200).json({
      status: true,
      data: blogs,
      pagination: {
        totalBlogs,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
      message: "Fetched All Blogs successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const top_three_latest_blogs = async (req, res) => {
  try {
    const get_three_latest_blogs = await Blog.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);

    return res.status(200).json({
      status: true,
      data: get_three_latest_blogs,
      message: "Fetched Latest Three Blogs successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const other_blogs = async (req, res) => {
  try {
    const { id } = req.params;
    const other_blogs = await Blog.aggregate([
      {
        $match: {
          _id: { $ne: new mongoose.Types.ObjectId(id) },
        },
      },
      {
        $sample: { size: 4 },
      },
    ]);

    return res.status(200).json({
      status: true,
      data: other_blogs,
      message: "Fetched Other Blogs successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_one_blog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id });

    if (!blog) {
      return res.status(404).json({
        status: false,
        message: "Blog Not Found!",
      });
    }

    return res.status(200).json({
      status: true,
      data: blog,
      message: "Fetched Single Blog successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const delete_blog = async (req, res) => {
  try {
    const { id } = req.params;
    const findBlog = await Blog.findOneAndDelete({ _id: id });
    if (!findBlog) {
      return res.status(404).json({
        status: false,
        message: "Blog Not Found!",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Blog Deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const update_blog = async (req, res) => {
  try {
    const { blogName, htmlContent, by } = req.body;
    const { id } = req.params;

    const verifyBlog = await Blog.findOne({ _id: id });
    if (!verifyBlog) {
      return res.status(404).json({
        status: false,
        message: "Blog Not Found!",
      });
    }

    await verifyBlog.updateOne({
      blogName,
      blogImage: req.file ? `${process.env.BACKEND_URL}/product/blogs/${req.file.filename}` : verifyBlog.blogImage,
      htmlContent,
      by,
    });
    return res
      .status(200)
      .json({ status: true, message: "Blog Updated Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  create_blog,
  get_all_blogs,
  top_three_latest_blogs,
  other_blogs,
  get_one_blog,
  delete_blog,
  update_blog,
};
