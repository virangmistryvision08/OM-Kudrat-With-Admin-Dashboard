const Order = require("../models/orderModel");

const get_all_orders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          status: "paid",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userinfo",
        },
      },
      {
        $unwind: "$userinfo",
      },
      {
        $addFields: {
          userName: "$userinfo.name",
          userEmail: "$userinfo.email",
        },
      },
      {
        $project: {
          userinfo: 0,
          userId: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    if (orders.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "No More Orders!" });
    }
    return res.status(200).json({
      status: true,
      data: orders,
      message: "Get All Orders Successfully!",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  get_all_orders,
};
