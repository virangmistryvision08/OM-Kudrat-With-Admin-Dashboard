import React, { useState, useEffect, useRef } from "react";
import logo from "../../public/om_kudrat_logo.svg";
import trash from "../../public/trash.svg";
import cart from "../../public/cart.svg";
import whislist from "../../public/whislist.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Snackbar,
  Tooltip,
  Typography,
  // useMediaQuery,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import axios from "axios";
// import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import empty_cart_image from "../../public/empty-cart-image.webp";

// Delete Modal Style
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

const style_cart_modal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    md: 550,
  },
  bgcolor: "white",
  boxShadow: 50,
  p: { xs: 3, md: 4 },
  borderRadius: "20px",
  maxHeight: {
    xs: "80vh",
    sm: "85vh",
    md: "70vh",
  },
  minHeight: {
    xs: "50vh",
    md: "40vh",
  },
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d1d1d19f",
    borderRadius: "8px",
  },
};

// Product Remove Modal Style
const style_model_remove_Product = {
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

const NavOmKudrat = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef(null);
  const navigate = useNavigate();
  const token = Cookie.get(import.meta.env.VITE_COOKIE_TOKEN_NAME);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState({});
  const [openLogout, setOpenLogout] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openProductRemoveModal, setOpenProductRemoveModal] = useState(false);
  const [productId, setProductId] = useState(null);
  // const [carts, setCarts] = useState([]);
  const {
    carts,
    get_all_carts,
    handleIncrement,
    handleDecrement,
    handleRemoveCart,
  } = useCart();
  const { wishlists, get_all_wishlists } = useWishlist();

  // Move underline on active tab
  useEffect(() => {
    const mainNavRoutes = ["/", "/products", "/about-us", "/blog", "/contact-us"];
    if (!mainNavRoutes.includes(location.pathname)) {
      setIndicatorStyle({ width: 0 });
      return;
    }

    const updateIndicator = () => {
      const activeLink = navRef.current?.querySelector(".active-link");
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      } else {
        setIndicatorStyle({});
      }
    };
    updateIndicator();

    // Recalculate on window resize
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/login")) {
      setActiveTab("login");
    } else if (location.pathname.includes("/register")) {
      setActiveTab("register");
    } else {
      setActiveTab("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (token === undefined) {
      setIsLogin(false);
    } else {
      const decode = jwtDecode(token);
      setUserName({ ...decode });
      setIsLogin(true);
    }
  }, [token]);

  const linkClass =
    "relative text-gray-800 font-medium transition-colors duration-300 pb-1";

  // Close mobile menu when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setOpenLogout(true);
  };

  const handleCart = () => {
    get_all_carts();
    setOpenCartModal(true);
    setMenuOpen(false);
  };

  const handleWhislist = () => {
    get_all_wishlists();
    navigate("/wishlist");
  };

  return (
    <nav className="shadow-sm w-full font-[Poppins] fixed top-0 bg-white z-50">
      <div className="mx-auto flex items-center justify-between py-2 w-[90%] lg:w-[80%]">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Om Kudrat Logo" className="h-12 sm:h-14" />
        </NavLink>

        {/* Desktop Navigation */}
        <div
          ref={navRef}
          className="relative hidden lg:flex items-center sm:gap-3 xl:!gap-8 text-[16px]"
        >
          {/* Animated underline */}
          <span
            className="absolute bottom-0 h-[2px] bg-black rounded-full transition-all duration-300 ease-in-out"
            style={indicatorStyle}
          ></span>

          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about-us", label: "About" },
            { to: "/blog", label: "Blog" },
            { to: "/contact-us", label: "Contact Us" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === `/products` || to === '/blog'}
              className={({ isActive }) =>
                `${linkClass} no-underline border-b-[1px] ${
                  isActive
                    ? "text-black border-b-2 border-black active-link font-[600]"
                    : "text-gray-600 border-transparent border-0 hover:border-black font-[400]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Section (icons + login/register) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Icons */}
          <div className="flex gap-2">
            {[whislist, cart].map((icon, i) => (
              <Badge
                key={i}
                overlap="circular"
                badgeContent={
                  icon === cart
                    ? carts[0]?.products.length
                    : wishlists[0]?.products.length
                }
                color="success"
                sx={{
                  "& .MuiBadge-badge": {
                    borderRadius: "50%",
                    border: "2px solid white",
                    padding: "0 6px",
                  },
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid gray",
                    cursor: "pointer",
                    ":hover": {
                      bgcolor: "#e5e5e5",
                      boxShadow: "1px 1px 4px gray",
                    },
                  }}
                  onClick={icon === cart ? handleCart : handleWhislist}
                >
                  <img
                    src={icon}
                    alt="icon"
                    className={`h-${i === 0 ? "4" : "5"} cursor-pointer`}
                  />
                </Box>
              </Badge>
            ))}
          </div>

          {/* Login / Register Tabs */}
          {!isLogin ? (
            <>
              <div className="flex justify-center">
                <div className="relative bg-gray-200 p-[6px] rounded-full w-52 flex">
                  {/* Sliding background */}
                  <div
                    className={`absolute top-[6px] left-[6px] h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                      activeTab === "register" ? "translate-x-full" : ""
                    }`}
                  ></div>

                  {/* Login Button */}
                  <button
                    onClick={() => {
                      setActiveTab("login");
                      navigate("/login");
                    }}
                    className={`relative z-10 w-1/2 py-[9px] font-medium rounded-full transition-all duration-300 ${
                      activeTab === "login" ? "text-gray-800" : "text-gray-600"
                    }`}
                  >
                    Login
                  </button>

                  {/* Register Button */}
                  <button
                    onClick={() => {
                      setActiveTab("register");
                      navigate("/register");
                    }}
                    className={`relative z-10 w-1/2 py-[9px] font-medium rounded-full transition-all duration-300 ${
                      activeTab === "register"
                        ? "text-gray-800"
                        : "text-gray-600"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Stack className="cursor-pointer" direction="row" spacing={2}>
                <Avatar className="!bg-[#f0f0f0] !text-gray-500 !border-[1px] !border-gray-500">
                  {userName?.name[0].toUpperCase() || (
                    <i class="fa-solid fa-user"></i>
                  )}
                </Avatar>
              </Stack>
              <Link
                onClick={handleLogout}
                className="bg-[#f0f0f0] text-gray-500 border-[1px] border-gray-500 px-5 py-2 rounded-full"
              >
                Logout
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-9 h-9"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-black my-[4px] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-black transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center bg-gray-50 border-t border-gray-200 py-4 gap-3">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about-us", label: "About" },
            { to: "/blog", label: "Blog" },
            { to: "/contact-us", label: "Contact Us" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-gray-800 no-underline ${
                  isActive ? "font-semibold border-b-2 border-black" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Icons for mobile */}
          <div className="flex md:hidden gap-3 pt-3">
            {[whislist, cart].map((icon, i) => (
              <Badge
                key={i}
                overlap="circular"
                badgeContent={
                  icon === cart
                    ? carts[0]?.products.length
                    : wishlists[0]?.products.length
                }
                color="success"
                sx={{
                  "& .MuiBadge-badge": {
                    borderRadius: "50%",
                    border: "2px solid white",
                    padding: "0 6px",
                  },
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    width: 38,
                    height: 38,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid black",
                  }}
                  onClick={icon === cart ? handleCart : handleWhislist}
                >
                  <img
                    src={icon}
                    alt="icon"
                    className={`h-${i === 0 ? "4" : "5"} cursor-pointer`}
                  />
                </Box>
              </Badge>
            ))}
          </div>

          {/* Login / Register Tabs */}
          {!isLogin ? (
            <>
              <div className="flex md:hidden justify-center">
                <div className="relative bg-gray-200 p-[6px] rounded-full w-52 flex">
                  {/* Sliding background */}
                  <div
                    className={`absolute top-[6px] left-[6px] h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${
                      activeTab === "register" ? "translate-x-full" : ""
                    }`}
                  ></div>

                  {/* Login Button */}
                  <button
                    onClick={() => {
                      setActiveTab("login");
                      navigate("/login");
                    }}
                    className={`relative z-10 w-1/2 py-[9px] font-medium rounded-full transition-all duration-300 ${
                      activeTab === "login" ? "text-gray-800" : "text-gray-600"
                    }`}
                  >
                    Login
                  </button>

                  {/* Register Button */}
                  <button
                    onClick={() => {
                      setActiveTab("register");
                      navigate("/register");
                    }}
                    className={`relative z-10 w-1/2 py-[9px] font-medium rounded-full transition-all duration-300 ${
                      activeTab === "register"
                        ? "text-gray-800"
                        : "text-gray-600"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Stack className="cursor-pointer" direction="row" spacing={2}>
                <Avatar className="!bg-[#f0f0f0] !text-gray-500 !border-[1px] !border-gray-500">
                  {userName?.name[0].toUpperCase() || (
                    <i class="fa-solid fa-user"></i>
                  )}
                </Avatar>
              </Stack>
              <Link
                onClick={handleLogout}
                className="bg-[#f0f0f0] text-gray-500 border-[1px] border-gray-500 px-5 py-2 rounded-full"
              >
                Logout
              </Link>
            </>
          )}
        </div>

        {/* Logout Modal */}
        <Modal
          open={openLogout}
          onClose={() => setOpenLogout(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              className="!font-[BelfastGroteskBold] text-center !font-bold !text-2xl"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Logout Confirmation!
            </Typography>
            <Typography
              className="text-gray-600 text-center !font-[Poppins]"
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Are You Sure You Want to Logout ?
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
                onClick={() => setOpenLogout(false)}
              >
                No
              </Button>
              <Button
                className="!text-gray-700 !font-semibold"
                variant="contained"
                color="inherit"
                onClick={() => {
                  Cookies.remove(import.meta.env.VITE_COOKIE_TOKEN_NAME);
                  navigate("/");
                  setOpenLogout(false);
                }}
              >
                Yes
              </Button>
            </Typography>
          </Box>
        </Modal>

        {/* Cart Modal */}
        <Modal
          open={openCartModal}
          onClose={() => setOpenCartModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="!outline-none" sx={style_cart_modal}>
            <Typography
              className="text-gray-600 text-center !font-[Poppins]"
              id="modal-modal-description"
              sx={{ mt: 0 }}
            >
              {carts.length === 0 || carts[0]?.products.length === 0 ? (
                <>
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
                      onClick={() => {
                        navigate("/products");
                        setOpenCartModal(false);
                      }}
                      className="bg-[#018D43] text-white px-7 py-3 rounded-full"
                    >
                      Add Items
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {carts[0]?.products.map((cart) => {
                    return (
                      <>
                        <div className="relative flex flex-col md:flex-row gap-4">
                          <div className="h-20 w-20 md:h-28 md:w-28 me-auto md:m-0">
                            <img
                              className="h-full !w-full rounded-2xl object-contain"
                              src={cart.productImage}
                              alt={cart.productName}
                            />
                          </div>

                          <div
                            onClick={() => handleRemoveCart(cart.productId)}
                            className="absolute top-0 right-0 md:hidden bg-gray-50 cursor-pointer rounded-full flex justify-center items-center h-[40px] w-[40px]"
                          >
                            <img className="h-auto" src={trash} alt="Trash" />
                          </div>

                          <div className="text-start w-full">
                            <div className="flex !justify-between">
                              <div className="text-xl font-[BelfastGroteskBold] font-semibold">
                                {cart.productName}
                              </div>
                              <div
                                onClick={() => {
                                  setOpenProductRemoveModal(true);
                                  setProductId(cart.productId);
                                }}
                                className="bg-gray-50 hidden cursor-pointer rounded-full md:flex justify-center items-center h-[40px] w-[40px]"
                              >
                                <img
                                  className="h-auto"
                                  src={trash}
                                  alt="Trash"
                                />
                              </div>
                            </div>

                            {/* For Mobile Screen Only */}
                            <div className="flex items-center gap-5 my-2 md:hidden">
                              <span className="text-sm text-gray-300 line-through">
                                {cart.productOldPrice?.toFixed(2)}
                              </span>
                              <div className="text-[#018D43] text-lg">
                                {cart.productNewPrice?.toFixed(2)} x{" "}
                                {cart.quantity}
                              </div>
                            </div>

                            <span className="text-xs text-gray-300 line-through hidden md:block">
                              {cart.productOldPrice}
                            </span>
                            <div className="flex flex-col md:flex-row gap-3 !justify-between">
                              <div className="text-[#018D43] hidden md:block">
                                {cart.productNewPrice} x {cart.quantity}
                              </div>
                              <div className="flex items-center justify-between gap-5 bg-gray-100 border px-3 py-2 md:py-1 rounded-full font-bold">
                                <RemoveIcon
                                  onClick={() =>
                                    handleDecrement(cart.productId)
                                  }
                                  className="text-green-700 cursor-pointer"
                                />{" "}
                                {cart.quantity}{" "}
                                <AddIcon
                                  onClick={() =>
                                    handleIncrement(cart.productId)
                                  }
                                  className="text-green-700 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <Divider className="!my-4" />
                      </>
                    );
                  })}
                </>
              )}

              {carts.length === 0 ||
                (carts[0]?.products.length === 0 ? null : (
                  <div className="flex justify-between text-lg font-[BelfastGroteskBold] !font-[600]">
                    <h1>Sub Total</h1>
                    <h1 className="text-[#018D43]">
                      ${carts[0]?.totalCartValue?.toFixed(2)}
                    </h1>
                  </div>
                ))}
            </Typography>

            {carts.length === 0 ||
              (carts[0]?.products.length === 0 ? null : (
                <Typography
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      setOpenCartModal(false);
                      navigate("/checkout");
                    }}
                    className="!bg-[#018D43] !text-white !font-semibold w-full !rounded-full !py-3"
                  >
                    Checkout
                  </Button>
                  <Button
                    onClick={() => {
                      setOpenCartModal(false);
                      navigate("/cart-details");
                    }}
                    className="!text-gray-700 !border !border-gray-300 !font-semibold w-full !rounded-full !py-3"
                    variant="outlined"
                  >
                    View Cart
                  </Button>
                </Typography>
              ))}
          </Box>
        </Modal>

        {/* Product Remove Confirmation Modal */}
        <Modal
          open={openProductRemoveModal}
          onClose={() => setOpenProductRemoveModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_model_remove_Product}>
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
                onClick={() => setOpenProductRemoveModal(false)}
              >
                No
              </Button>
              <Button
                className="!text-gray-700 !font-semibold"
                variant="contained"
                color="inherit"
                onClick={() => {
                  handleRemoveCart(productId);
                  setOpenProductRemoveModal(false);
                  setProductId(null);
                }}
              >
                Yes
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </nav>
  );
};

export default NavOmKudrat;
