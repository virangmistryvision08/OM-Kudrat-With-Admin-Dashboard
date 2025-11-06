import React from "react";
import product_background from "../../public/products/products-background.jpg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Box, Divider, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import trash from "../../public/trash.svg";
import round_div_cart_details from "../../public/round-div-cart-details.svg";
import BestSellingProducts from "./home/BestSellingProducts";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import empty_cart_image from "../../public/empty-cart-image.webp";
import { useCart } from "../context/CartContext";

const CartDetails = () => {
  const navigate = useNavigate();
  const { carts, handleIncrement, handleDecrement, handleRemoveCart } =
    useCart();
  const cgstText = 32.12;
  const sgstText = 32.12;

  const products = carts[0]?.products || [];

  return (
    <>
      <section className="w-full mt-24 pb-10 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <section
            className="relative bg-white min-h-72 rounded-2xl"
            style={{
              backgroundImage: `url("${product_background}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">Cart Detail</h1>
              <p className="text-xs mt-2">Home &gt; Cart</p>
            </div>
          </section>

          <div className="flex flex-col xl:flex-row justify-between gap-10 my-10 md:my-20">
            {/* 🛒 LEFT SIDE — SHOPPING BAG */}
            <div className="w-full xl:w-[70%]">
              <h1 className="text-2xl font-[BelfastGrotesk]">Shopping bag</h1>

              <Box className="!outline-none !w-full mt-5">
                {products.length === 0 ? (
                  <div className="text-center">
                    <img
                      className="mx-auto"
                      src={empty_cart_image}
                      alt="Empty Cart"
                    />
                    <h1 className="text-2xl font-[BelfastGrotesk]">
                      Empty Cart!
                    </h1>
                    <p className="mt-5 mb-2 text-gray-400">
                      Want to add Items?
                    </p>
                    <button
                      onClick={() => navigate("/products")}
                      className="bg-[#018D43] text-white px-7 py-3 rounded-full"
                    >
                      Add Items
                    </button>
                  </div>
                ) : (
                  <TableContainer
                    className="overflow-x-auto"
                    sx={{ borderRadius: "12px" }}
                  >
                    <Table>
                      <TableBody>
                        {products.map((cartItem) => (
                          <TableRow key={cartItem.productId}>
                            {/* Remove Icon */}
                            <TableCell align="center">
                              <CancelOutlinedIcon
                                className="cursor-pointer"
                                sx={{ fontSize: 24 }}
                                onClick={() =>
                                  handleRemoveCart(cartItem.productId)
                                }
                              />
                            </TableCell>

                            {/* Product Image */}
                            <TableCell
                              align="center"
                              className="min-w-[100px] sm:min-w-[120px]"
                            >
                              <img
                              onClick={() =>
                                navigate(`/products/${cartItem.productId}`)
                              }
                                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain rounded-lg mx-auto cursor-pointer"
                                src={cartItem.productImage}
                                alt={cartItem.productName}
                              />
                            </TableCell>

                            {/* Product Name */}
                            <TableCell align="left">
                              <Typography
                                onClick={() =>
                                  navigate(`/products/${cartItem.productId}`)
                                }
                                className="lg:!text-xl cursor-pointer"
                                sx={{
                                  fontFamily: "BelfastGroteskBold",
                                  fontWeight: 600,
                                }}
                              >
                                {cartItem.productName}
                              </Typography>
                            </TableCell>

                            {/* Price */}
                            <TableCell
                              className="!text-lg !font-[Poppins]"
                              align="center"
                            >
                              ${cartItem.productNewPrice.toFixed(2)}
                            </TableCell>

                            {/* Quantity Controls */}
                            <TableCell align="center">
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: 0,
                                  bgcolor: "grey.100",
                                  borderRadius: "20px",
                                  px: 1.5,
                                  py: 1.2,
                                }}
                              >
                                <RemoveIcon
                                  onClick={() =>
                                    handleDecrement(cartItem.productId)
                                  }
                                  className="text-green-700 cursor-pointer"
                                />
                                <Typography className="!font-[Poppins] !font-bold">
                                  {cartItem.quantity}
                                </Typography>
                                <AddIcon
                                  onClick={() =>
                                    handleIncrement(cartItem.productId)
                                  }
                                  className="text-green-700 cursor-pointer"
                                />
                              </Box>
                            </TableCell>

                            {/* Subtotal */}
                            <TableCell
                              className="!text-lg !font-[400] !font-[Poppins]"
                              align="center"
                              sx={{ color: "#018D43", fontWeight: "bold" }}
                            >
                              ${cartItem.subtotal.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Divider />
                  </TableContainer>
                )}
              </Box>
            </div>

            {/* 🧾 RIGHT SIDE — CART TOTALS */}
            {products.length > 0 && (
              <div className="w-full md:w-[60%] mx-auto xl:w-[30%]">
                <h1 className="text-2xl font-[BelfastGrotesk]">Cart Totals</h1>

                <div className="h-auto xl:h-[72vh] w-full mt-5 relative">
                  <img
                    className="w-full h-full"
                    src={round_div_cart_details}
                    alt=""
                  />
                  <div
                    className="text-sm md:text-lg lg:text-xl xl:text-lg w-[90%] md:w-[80%] p-4"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <h1 className="text-lg md:text-xl lg:text-2xl xl:text-xl">
                        {`$${carts[0]?.totalCartValue}`}
                      </h1>
                    </div>

                    <Divider className="!my-2 md:!my-5" />

                    <div className="flex justify-between items-center">
                      <span>Includes CGST </span>
                      <h1>${cgstText}</h1>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Includes SGST </span>
                      <h1>${sgstText}</h1>
                    </div>

                    <Divider className="!my-2 md:!my-4" />

                    <div className="flex justify-between items-center">
                      <span>Total</span>
                      <h1 className="text-[#018D43]">{`$${(
                        carts[0]?.totalCartValue +
                        cgstText +
                        sgstText
                      ).toFixed(2)}`}</h1>
                    </div>

                    <Divider className="!my-4" />

                    <div>
                      <span>Have a gift card ?</span>
                      <div className="flex justify-between items-center mt-5">
                        <input
                          className="h-[52px] rounded-full ps-5 placeholder:text-sm outline-[#018D43] w-full border border-gray-300"
                          type="text"
                          placeholder="Gift card number"
                        />
                        <button className="h-[52px] px-4 text-sm rounded-full bg-[#018D43] text-white">
                          Apply
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        navigate("/checkout", {
                          state: {
                            totalAmount:
                              carts[0]?.totalCartValue + cgstText + sgstText,
                          },
                        });
                      }}
                      className="bg-[#018D43] w-full py-3 rounded-full mt-10 text-white"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <BestSellingProducts />
      <Footer />
    </>
  );
};

export default CartDetails;
