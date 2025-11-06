// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [token, setToken] = useState(Cookies.get(import.meta.env.VITE_COOKIE_TOKEN_NAME) || null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = Cookies.get(import.meta.env.VITE_COOKIE_TOKEN_NAME);
      if (newToken !== token) setToken(newToken || null);
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const get_all_carts = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart/get-all-carts`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCarts(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleIncrement = async (productId) => {
    if (!token) {
      navigate("/login");
      // toast.error("Please login first!");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/increment-quantity/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      await get_all_carts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDecrement = async (productId) => {
    if (!token) {
      navigate("/login");
      // toast.error("Please login first!");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/decrement-quantity/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      await get_all_carts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleRemoveCart = async (productId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/remove-from-cart/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      await get_all_carts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      navigate("/login");
      // toast.error("Please login first!");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cart/add-in-cart/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      await get_all_carts();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const clearCart = () => {
    setCarts([]);
  };

  useEffect(() => {
    if (token) get_all_carts();
    else setCarts([]);
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        carts,
        get_all_carts,
        handleIncrement,
        handleDecrement,
        handleRemoveCart,
        handleAddToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
