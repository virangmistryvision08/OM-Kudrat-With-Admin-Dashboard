import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Box,
  Typography,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import cookie from "js-cookie";

interface Product {
  productImage: string;
  productName: string;
  quantity: number;
  productNewPrice: number;
}

interface Order {
  _id: string;
  userName: string;
  userEmail: string;
  cartProducts: Product[];
  amount: number;
  status: string;
  createdAt: string;
  orderId: string;
}

const Orders: React.FC = ({ limit, filter, setlimit }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [totalProducts, setTotalProducts] = useState(null);
  const [token, setToken] = useState(
    cookie.get(`${import.meta.env.VITE_COOKIE_TOKEN_NAME}`)
  );

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  useEffect(() => {
    get_all_orders(currentPage, limit);
  }, [currentPage, limit, filter, token]);

  const get_all_orders = async (currentPage: number, limit: number) => {
    setOrders([]);
    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage);
    queryParams.append("limit", limit);
    queryParams.append("filter", filter);

    await axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/orders/get-all-orders?${queryParams.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.data.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          return;
        }

        setOrders(res.data.data);
        const pagination = res.data.pagination;
        setTotalProducts(pagination.totalProducts || 0);
        setTotalPages(pagination.totalPages || 1);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
  };

  const goToFirstPage = () => {
    if (currentPage > 1) setCurrentPage(1);
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) setCurrentPage(totalPages);
  };

  return (
    <>
      <TableContainer
        className="shadow-none dark:border-gray-800 dark:bg-white/[0.03]"
        sx={{ borderRadius: 1, overflow: "hidden" }}
      >
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <Table className=" !font-[Poppins]">
            <TableHead>
              <TableRow>
                <TableCell align="center" />
                <TableCell className="font-semibold !font-[Poppins] dark:!text-white/90">
                  User Name
                </TableCell>
                <TableCell className="font-semibold !font-[Poppins] dark:!text-white/90">
                  User Email
                </TableCell>
                <TableCell className="font-semibold !font-[Poppins] dark:!text-white/90">
                  Order ID
                </TableCell>
                <TableCell
                  className="font-semibold !font-[Poppins] dark:!text-white/90"
                  align="center"
                >
                  Total Products
                </TableCell>
                <TableCell className="font-semibold !font-[Poppins] dark:!text-white/90">
                  Total Amount
                </TableCell>
                <TableCell
                  className="font-semibold !font-[Poppins] dark:!text-white/90"
                  align="center"
                >
                  Payment Status
                </TableCell>
                <TableCell
                  className="font-semibold !font-[Poppins] dark:!text-white/90"
                  align="right"
                >
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.length === 0 ? (
                <>
                  <div className="p-5">
                    <h1 className="font-semibold text-gray-600 text-center text-xl">
                      Orders Not Found!
                    </h1>
                  </div>
                </>
              ) : (
                <>
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      {/* ===== MAIN ROW ===== */}
                      <TableRow
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => toggleRow(order._id)}
                      >
                        <TableCell align="center">
                          {expandedRow === order._id ? (
                            <i className="fa-solid fa-angle-up dark:!text-white/90"></i>
                          ) : (
                            <i className="fa-solid fa-angle-down dark:!text-white/90"></i>
                          )}
                        </TableCell>
                        <TableCell className=" !font-[Poppins] dark:!text-white/90">
                          {order.userName}
                        </TableCell>
                        <TableCell className=" !font-[Poppins] dark:!text-white/90">
                          {order.userEmail}
                        </TableCell>
                        <TableCell className=" !font-[Poppins] dark:!text-white/90">
                          {order.orderId}
                        </TableCell>
                        <TableCell
                          className=" !font-[Poppins] dark:!text-white/90"
                          align="center"
                        >
                          {order.cartProducts.length}
                        </TableCell>
                        <TableCell className=" !font-[Poppins] dark:!text-white/90 !font-semibold">
                          ${order.amount.toFixed(2)}
                        </TableCell>
                        <TableCell
                          className=" !font-[Poppins] dark:!text-white/90"
                          align="center"
                        >
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "paid"
                                ? "bg-green-100 text-green-600 border border-green-400 dark:!bg-green-700 dark:!text-green-300"
                                : "bg-red-100 text-red-600 border border-red-400 dark:!bg-red-700 dark:!text-red-300"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell
                          className=" dark:!text-white/90"
                          align="right"
                        >
                          {format(new Date(order.createdAt), "dd MMM yyyy")}
                        </TableCell>
                      </TableRow>

                      {/* ===== COLLAPSIBLE DETAILS ROW ===== */}
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          sx={{ paddingBottom: 0, paddingTop: 0 }}
                        >
                          <Collapse
                            in={expandedRow === order._id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box className="flex justify-center my-4">
                              <Box className="overflow-x-auto w-full">
                                <Box className="min-w-[600px]">
                                  <Typography
                                    className="!font-semibold !font-[Poppins] mb-2 text-lg"
                                    variant="subtitle1"
                                  >
                                    Order Details
                                  </Typography>

                                  <Table size="medium" className="w-full">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell className="font-semibold !font-[Poppins]">
                                          Product Image
                                        </TableCell>
                                        <TableCell className="font-semibold !font-[Poppins]">
                                          Product Name
                                        </TableCell>
                                        <TableCell
                                          className="font-semibold !font-[Poppins]"
                                          align="center"
                                        >
                                          Quantity
                                        </TableCell>
                                        <TableCell
                                          className="font-semibold !font-[Poppins]"
                                          align="center"
                                        >
                                          Price
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {order.cartProducts.map(
                                        (product, index) => (
                                          <TableRow key={index}>
                                            <TableCell>
                                              <img
                                                src={product.productImage}
                                                alt={product.productName}
                                                className="h-14 w-14 rounded-lg object-cover"
                                              />
                                            </TableCell>
                                            <TableCell className="!font-[Poppins]">
                                              {product.productName}
                                            </TableCell>
                                            <TableCell
                                              className="!font-[Poppins]"
                                              align="center"
                                            >
                                              {product.quantity}
                                            </TableCell>
                                            <TableCell
                                              className="!font-[Poppins]"
                                              align="center"
                                            >
                                              ${product.productNewPrice}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>
                                </Box>
                              </Box>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 gap-7">
        <div className="flex items-center justify-end gap-2 dark:text-white/90">
          Rows Per Page
          <select
            className="border"
            defaultValue={5}
            onChange={(e) => setlimit(e.target.value)}
            name="productLimit"
            id=""
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>{" "}
        </div>

        <div className="dark:text-white/90">
          {currentPage} - {totalPages} of {totalPages}
        </div>

        <div className="flex items-center">
          <button
            disabled={currentPage === 1}
            onClick={goToFirstPage}
            className={`px-4 py-2 rounded-full hover:bg-gray-100 dark:!text-gray-200 dark:hover:bg-gray-700 ${
              currentPage === 1 &&
              "text-gray-400 hover:bg-white dark:hover:bg-black"
            }`}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>

          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              shape="rounded"
              onChange={handlePageChange}
              siblingCount={0}
              boundaryCount={0}
              renderItem={(item) => {
                if (
                  item.type === "page" ||
                  item.type === "start-ellipsis" ||
                  item.type === "end-ellipsis"
                ) {
                  return null;
                }

                return (
                  <PaginationItem
                  className="dark:!text-white/90"
                    {...item}
                    sx={{
                      "&.MuiPaginationItem-root": {
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                      },
                    }}
                  />
                );
              }}
            />
          </Stack>

          <button
            disabled={currentPage === totalPages}
            onClick={goToLastPage}
            className={`px-4 py-2 rounded-full hover:bg-gray-100 dark:!text-gray-200 dark:hover:bg-gray-700 ${
              currentPage === totalPages &&
              "text-gray-400 hover:bg-white dark:hover:bg-black"
            }`}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Orders;
