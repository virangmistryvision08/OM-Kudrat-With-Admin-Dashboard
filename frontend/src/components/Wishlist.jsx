import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import trash from "../../public/trash.svg";
import BestSellingProducts from "./home/BestSellingProducts";
import Footer from "./Footer";
import empty_wishlist from "../../public/wishlistEmpty.png";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

// Wishlist Remove Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 50,
  p: 4,
  borderRadius: "10px",
};

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlists, toggleWishlist } = useWishlist();
  const [openWishlist, setOpenWishlist] = useState(false);
  const [productId, setProductId] = useState(null);

  return (
    <>
      <section className="w-full mt-24 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <section className="relative bg-white min-h-72 rounded-2xl place-order-bg">
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">Wishlist</h1>
              <p className="text-xs mt-2">Home &gt; Wishlist</p>
            </div>
          </section>

          <div className="my-10 md:my-20">
            <h1 className="text-xl font-[BelfastGrotesk]">My Wishlist</h1>

            {wishlists.length === 0 || wishlists[0]?.products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 !my-20">
                <img
                  className="h-full"
                  src={empty_wishlist}
                  alt="Empty Wishlist"
                />
                <h1 className="text-2xl mt-2 font-[BelfastGrotesk]">
                  Empty Wishlist!
                </h1>
                <button
                  onClick={() => navigate("/products")}
                  className="mt-4 px-6 py-2 bg-[#018D43] text-white rounded-full"
                >
                  Visit Shop
                </button>
              </div>
            ) : (
              <>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ padding: "0px" }} align="start">
                          Products
                        </TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell sx={{ padding: "0px" }} align="right">
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wishlists[0]?.products.map((product) => (
                        <React.Fragment key={product.productId}>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              sx={{ padding: "20px 0px" }}
                              className="!flex !items-center !gap-5"
                              align="left"
                            >
                              <div
                                onClick={() =>
                                  navigate(`/products/${product.productId}`)
                                }
                                className="relative h-24 w-24 bg-gray-400 cursor-pointer"
                              >
                                <img
                                  className="object-cover h-full w-full"
                                  src={product.productImage}
                                  alt={product.productName}
                                />
                                <div className="absolute inset-0 bg-[#909090] bg-opacity-10 rounded-xl z-0"></div>
                              </div>
                              <h1
                                onClick={() =>
                                  navigate(`/products/${product.productId}`)
                                }
                                className="lg:text-lg font-[BelfastGrotesk] cursor-pointer"
                              >
                                {product.productName}
                              </h1>
                            </TableCell>
                            <TableCell
                              className="xl:!text-lg !font-[400] !font-[Poppins]"
                              align="center"
                            >
                              ${product.productNewPrice.toFixed(2)}
                            </TableCell>
                            <TableCell
                              sx={{ padding: "20px 0px" }}
                              align="right"
                            >
                              <div
                                onClick={() => {
                                  setOpenWishlist(true);
                                  setProductId(product.productId);
                                }}
                                className="p-2 bg-gray-50 w-fit ms-auto rounded-full cursor-pointer"
                              >
                                <img className="h-6" src={trash} alt="Delete" />
                              </div>
                            </TableCell>
                          </TableRow>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </div>
          {/* Wishlist Remove Confirmation Modal */}
          <Modal
            open={openWishlist}
            onClose={() => setOpenWishlist(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                className="text-gray-600 text-center !font-[Poppins]"
                id="modal-modal-description"
                sx={{ mt: 2 }}
              >
                Are You Sure You Want to Remove ?
              </Typography>
              <Typography
                sx={{
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                  justifyContent: "center",
                }}
              >
                <Button
                  className="!text-gray-700 !font-semibold"
                  variant="contained"
                  color="inherit"
                  onClick={() => setOpenWishlist(false)}
                >
                  No
                </Button>
                <Button
                  className="!text-gray-700 !font-semibold"
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    toggleWishlist(productId);
                    setOpenWishlist(false);
                    setProductId(null);
                  }}
                >
                  Yes
                </Button>
              </Typography>
            </Box>
          </Modal>
        </div>
      </section>
      <BestSellingProducts />
      <Footer />
    </>
  );
};

export default Wishlist;
