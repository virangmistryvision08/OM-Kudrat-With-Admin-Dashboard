import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
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
} from "@mui/material";

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
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/orders/get-all-orders`)
      .then((res) => setOrders(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="Orders" />
      <PageMeta
        title="Orders List"
        description="Manage all Orders in the TailAdmin dashboard."
      />

      <div className="rounded-2xl border border-gray-200 bg-white !px-7 !py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <TableContainer
          className="shadow-none dark:border-gray-800 dark:bg-white/[0.03]"
          sx={{ borderRadius: 1, overflow: "hidden" }}
        >
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <Table className=" !font-[Poppins]">
              <TableHead>
                <TableRow>
                  <TableCell align="center" />
                  <TableCell className="font-semibold !font-[Poppins]">
                    User Name
                  </TableCell>
                  <TableCell className="font-semibold !font-[Poppins]">
                    User Email
                  </TableCell>
                  <TableCell
                    className="font-semibold !font-[Poppins]"
                    align="center"
                  >
                    Total Products
                  </TableCell>
                  <TableCell className="font-semibold !font-[Poppins]">
                    Total Amount
                  </TableCell>
                  <TableCell
                    className="font-semibold !font-[Poppins]"
                    align="center"
                  >
                    Payment Status
                  </TableCell>
                  <TableCell
                    className="font-semibold !font-[Poppins]"
                    align="right"
                  >
                    Created At
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
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
                          <i className="fa-solid fa-angle-up"></i>
                        ) : (
                          <i className="fa-solid fa-angle-down"></i>
                        )}
                      </TableCell>
                      <TableCell className=" !font-[Poppins]">
                        {order.userName}
                      </TableCell>
                      <TableCell className=" !font-[Poppins]">
                        {order.userEmail}
                      </TableCell>
                      <TableCell className=" !font-[Poppins]" align="center">
                        {order.cartProducts.length}
                      </TableCell>
                      <TableCell className=" !font-[Poppins] !font-semibold">
                        ${order.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className=" !font-[Poppins]" align="center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "paid"
                              ? "bg-green-100 text-green-600 border border-green-400"
                              : "bg-red-100 text-red-600 border border-red-400"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell align="right">
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
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </div>
    </>
  );
};

export default OrdersList;
