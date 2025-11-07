const User = require("../models/userModel");
const Order = require("../models/orderModel");

const get_dashboard_stats = async (req, res) => {
  try {
    let { filter } = req.query;
    const now = new Date();
    let dateFilter = {};

    switch (filter) {
      case "today": {
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const endOfToday = new Date(now.setHours(23, 59, 59, 999));
        dateFilter = { createdAt: { $gte: startOfToday, $lte: endOfToday } };
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
        dateFilter = { createdAt: { $gte: firstDayOfWeek, $lte: endOfWeek } };
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
        dateFilter = { createdAt: { $gte: startOfMonth, $lte: endOfMonth } };
        break;
      }

      case "thisYear": {
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        dateFilter = { createdAt: { $gte: startOfYear, $lte: endOfYear } };
        break;
      }

      default:
        dateFilter = {};
    }

    const customerCountAgg = await User.aggregate([
      { $match: { ...dateFilter, role: { $ne: "Admin" } } },
      { $count: "count" },
    ]);
    const totalCustomers = customerCountAgg[0]?.count || 0;

    const orderCountAgg = await Order.aggregate([
      { $match: { ...dateFilter, status: "paid" } },
      { $count: "count" },
    ]);
    const totalOrders = orderCountAgg[0]?.count || 0;

    const revenueAgg = await Order.aggregate([
      { $match: { ...dateFilter, status: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    return res.status(200).json({
      status: true,
      filter: filter || "all",
      data: {
        totalCustomers,
        totalOrders,
        totalRevenue,
      },
      message: "Dashboard data fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  get_dashboard_stats,
};
