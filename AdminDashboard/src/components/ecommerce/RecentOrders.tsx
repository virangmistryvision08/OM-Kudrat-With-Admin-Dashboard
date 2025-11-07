import { useState } from "react";
import Orders from "../../pages/OtherPage/order/Orders";

export default function RecentOrders() {
  const [limit, setlimit] = useState(5);
  const [filter, setFilter] = useState<string>("");
  
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Orders
        </h3>

        <div className="flex items-center gap-3">
          {/* <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Filter
          </button> */}

          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => {
                // setCurrentPage(1); // reset to first page
                setFilter(e.target.value);
              }}
              className="border border-gray-300 bg-white px-3 py-2 rounded-lg text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 cursor-pointer"
            >
              <option value="">All</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="thisYear">This Year</option>
            </select>

            <button
              onClick={() => {
                setFilter(""); // reset
                // setCurrentPage(1);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              See all
            </button>
          </div>
{/* 
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button> */}
        </div>
      </div>

      <Orders limit={limit} setlimit={setlimit} filter={filter} />
    </div>
  );
}
