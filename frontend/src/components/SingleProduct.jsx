import React, { useEffect, useRef, useState } from "react";
import single_product_background from "../../public/products/single-product-bgimage.jpg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BestSellingProducts from "./home/BestSellingProducts";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const SingleProduct = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { slug } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const { wishlists, toggleWishlist } = useWishlist();
  const { carts, handleIncrement, handleDecrement, handleAddToCart } = useCart();
  const [images, setImages] = useState([]);
  const mainSwiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    getOneProduct();
  }, [slug]);

  const getOneProduct = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/get-one-product/${slug}`)
      .then((res) => {
        setSingleProduct(res.data.data);
        setImages([
          res.data.data.productImage,
          "/products/single-product1.png",
          "/products/single-product2.png",
          "/products/single-product3.png",
        ]);
      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  };

  const productQuantity =
    carts[0]?.products?.find(
      (cartItem) => cartItem.productId === singleProduct._id
    )?.quantity || 0;

  const cartProduct = carts[0]?.products?.find(
    (cartItem) => cartItem.productId === singleProduct._id
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <section className="w-full mt-24 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          {/* Banner Section */}
          <section
            className="relative bg-white min-h-72 rounded-2xl"
            style={{
              backgroundImage: `url("${single_product_background}")`,
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">Products</h1>
              <p className="text-xs mt-2">Home &gt; Products</p>
            </div>
          </section>

          {/* Product Details */}
          <div className="flex flex-col lg:flex-row justify-between gap-10 items-end mt-20">
            <div className="relative rounded-xl h-[220px] md:h-[550px] w-full lg:w-1/2">
              <Swiper
                modules={[Navigation]}
                // navigation
                slidesPerView={1}
                onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                speed={600}
                className="w-full h-full"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      className="object-contain rounded-xl h-full w-full transition-all duration-500 ease-in-out"
                      src={img}
                      alt={`product`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute inset-0 bg-[#f5d5c0] bg-opacity-15 rounded-xl z-0"></div>
            </div>

            <div className="w-full lg:w-1/2">
              <div>
                <h1 className="text-4xl font-[BelfastGrotesk]">
                  {singleProduct.productName}
                </h1>
                <h2 className="text-3xl md:text-4xl font-[600] my-4 text-green-600">
                  ${singleProduct.productNewPrice}{" "}
                  <span className="text-sm text-gray-400 ms-2 line-through">
                    ${singleProduct.productOldPrice}
                  </span>
                </h2>
              </div>

              <p className="text-sm text-gray-600">
                Add an extra dose of style with this raw look henley t-shirt
                from the house of Tinted. Team this T-shirt with distressed
                jeans and leather sandals for a relaxed and...
              </p>

              <hr className="my-5" />

              <div>
                <div className="flex items-center">
                  <div className="flex items-center justify-between gap-7 bg-gray-100 border p-3 rounded-full font-bold">
                    <RemoveIcon
                      onClick={() => handleDecrement(singleProduct._id)}
                      className="text-green-700 cursor-pointer"
                    />
                    {productQuantity || 1}
                    <AddIcon
                      onClick={() => handleIncrement(singleProduct._id)}
                      className="text-green-700 cursor-pointer"
                    />
                  </div>
                  {!cartProduct ? (
                    <button
                      disabled={false}
                      onClick={() => handleAddToCart(singleProduct._id)}
                      className="py-3 px-6 rounded-full bg-green-600 text-white"
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button
                      disabled={true}
                      className="py-3 px-6 rounded-full bg-green-500 cursor-not-allowed text-white"
                    >
                      Add to cart
                    </button>
                  )}
                </div>

                <div className="mt-5 flex gap-2 items-center">
                  <button
                    onClick={() => toggleWishlist(singleProduct._id)}
                    className="border rounded-full text-gray-600 border-gray-300 px-5 py-2 flex items-center gap-7 hover:bg-gray-100 transition"
                  >
                    Add to wishlist
                    {wishlists[0]?.products.find(
                      (item) => item.productId === singleProduct._id
                    ) ? (
                      <Favorite className="text-red-500" />
                    ) : (
                      <FavoriteBorderIcon className="text-gray-500" />
                    )}
                  </button>

                  <button className="text-gray-600 transition">
                    <ShareOutlinedIcon />
                  </button>
                </div>
              </div>

              <p className="flex gap-3 my-4">
                Category{" "}
                <span className="text-gray-500">
                  {singleProduct.categoryName}
                </span>
              </p>

              <div className="flex gap-3 md:gap-5 lg:gap-7  mt-10 lg:mt-20">
                {images.map((img, index) => (
                  <img
                    key={index}
                    // className="object-cover h-24 w-1/4 lg:w-1/6 rounded-lg"
                    src={img}
                    alt={`product ${index + 1}`}
                    onClick={() => {
                      setActiveIndex(index);
                      mainSwiperRef.current?.slideTo(index);
                    }}
                    className={`object-cover h-20 w-20 md:h-24 lg:h-20 xl:h-24 2xl:h-28 md:w-24 lg:w-20 xl:w-24 2xl:w-28 rounded-lg cursor-pointer overflow-hidden border-2 transition ${
                      activeIndex === index
                        ? "border-green-600 scale-105"
                        : "border-transparent"
                    }`}
                  />
                ))}
                {/* <img
                  className="object-cover h-24 w-1/4 lg:w-1/6 rounded-lg"
                  src={single_product2}
                  alt="product2"
                />
                <img
                  className="object-cover h-24 w-1/4 lg:w-1/6 rounded-lg"
                  src={single_product3}
                  alt="product3"
                /> */}
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Box className="w-full my-14 bg-gray-100 rounded-2xl border border-gray-400">
            <AppBar className="!bg-black rounded-t-2xl" position="static">
              <Tabs
                className="!mx-auto"
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="responsive tabs example"
                sx={{
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "90%", md: 800 },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#1bbd30",
                    height: 3,
                  },
                  "& .MuiTab-root": {
                    color: "whitesmoke",
                    textTransform: "none",
                    fontWeight: 500,
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                    minWidth: { xs: 100, sm: 120, md: 200 },
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#1bbd30",
                    fontWeight: "bold",
                  },
                }}
              >
                <Tab
                  className=" !font-[BelfastGrotesk]"
                  label="Description"
                  {...a11yProps(0)}
                />
                <Tab
                  className=" !font-[BelfastGrotesk]"
                  label="Additional Information"
                  {...a11yProps(1)}
                />
                <Tab
                  className=" !font-[BelfastGrotesk]"
                  label="Review"
                  {...a11yProps(2)}
                />
              </Tabs>
            </AppBar>

            <TabPanel
              className="p-2 md:p-5"
              value={value}
              index={0}
              dir={theme.direction}
            >
              <li className=" font-[Poppins]">
                Add an extra dose of style with this raw look henley t-shirt
                from the house of Tinted. Team this T-shirt with distressed
                jeans and leather sandals for a relaxed and cool look.Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
              <li className="mt-4 font-[Poppins]">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s.Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release, and more recently
                with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </li>
              <li className="mt-4 font-[Poppins]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </li>
              <li className="mt-4 font-[Poppins]">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </li>
            </TabPanel>
            <TabPanel
              className="p-2 md:p-5"
              value={value}
              index={1}
              dir={theme.direction}
            >
              <li className=" font-[Poppins]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </li>
              <li className="mt-4 font-[Poppins]">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s.Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release, and more recently
                with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </li>
              <li className="mt-4 font-[Poppins]">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </li>
              <li className="mt-4 font-[Poppins]">
                Add an extra dose of style with this raw look henley t-shirt
                from the house of Tinted. Team this T-shirt with distressed
                jeans and leather sandals for a relaxed and cool look.Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
            </TabPanel>
            <TabPanel
              className="p-2 md:p-5"
              value={value}
              index={2}
              dir={theme.direction}
            >
              <li className=" font-[Poppins]">
                Add an extra dose of style with this raw look henley t-shirt
                from the house of Tinted. Team this T-shirt with distressed
                jeans and leather sandals for a relaxed and cool look.Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
              <li className="mt-4 font-[Poppins]">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </li>
              <li className="mt-4 font-[Poppins]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </li>
              <li className="mt-4 font-[Poppins]">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s.Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release, and more recently
                with desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </li>
            </TabPanel>
          </Box>
        </div>
      </section>

      <BestSellingProducts />
      <Footer />
    </>
  );
};

export default SingleProduct;
