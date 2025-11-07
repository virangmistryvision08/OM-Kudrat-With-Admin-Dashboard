const Order = require("../models/orderModel");

const get_all_orders = async (req, res) => {
  try {
    let { page, limit, filter } = req.query;
    page = Number(page) || 1;
    limit = Number(limit) || 7;
    const skip = (page - 1) * limit;

    let dateFilter = {};
    const now = new Date();

    switch (filter) {
      case "today": {
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const endOfToday = new Date(now.setHours(23, 59, 59, 999));
        dateFilter = {
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        };
        break;
      }

      case "yesterday": {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
        const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));
        dateFilter = {
          createdAt: { $gte: startOfYesterday, $lte: endOfYesterday },
        };
        break;
      }

      case "thisWeek": {
        const firstDayOfWeek = new Date(now);
        const day = now.getDay();
        firstDayOfWeek.setDate(now.getDate() - day);
        firstDayOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(firstDayOfWeek);
        endOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        dateFilter = {
          createdAt: { $gte: firstDayOfWeek, $lte: endOfWeek },
        };
        break;
      }

      case "thisMonth": {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        );
        dateFilter = {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        };
        break;
      }

      case "thisYear": {
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        dateFilter = {
          createdAt: { $gte: startOfYear, $lte: endOfYear },
        };
        break;
      }

      default:
        dateFilter = {};
    }

    const orders = await Order.aggregate([
      {
        $match: {
          ...dateFilter,
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
        $unwind: { path: "$userinfo", preserveNullAndEmptyArrays: true },
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
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalProducts: [{ $count: "count" }],
        },
      },
    ]);

    const products = orders[0]?.data || [];
    const totalProducts = orders[0]?.totalProducts[0]?.count || 0;
    const totalPages = totalProducts > 0 ? Math.ceil(totalProducts / limit) : 1;

    return res.status(200).json({
      status: true,
      data: products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
      message: "Fetched all orders successfully!",
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  get_all_orders,
};
