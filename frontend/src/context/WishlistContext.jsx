// src/context/WishlistContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlists, setWishlists] = useState([]);
  const [token, setToken] = useState(Cookies.get(import.meta.env.VITE_COOKIE_TOKEN_NAME) || null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get(import.meta.env.VITE_COOKIE_TOKEN_NAME);
      if (newToken !== token) setToken(newToken || null);
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const get_all_wishlists = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/get-all-wishlists`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlists(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!token) {
      navigate("/login");
      // toast.error("Please login first!");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/toggle-wishlist/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      await get_all_wishlists();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) get_all_wishlists();
    else setWishlists([]);
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{ wishlists, get_all_wishlists, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
