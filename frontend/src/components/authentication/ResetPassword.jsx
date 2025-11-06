import React, { useState } from "react";
import auth_img1 from "../../../public/image.jpg";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [user, setUser] = useState({});
  const [errorMSG, setErrorMSG] = useState({});
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getData = (e) => {
    user[e.target.name] = e.target.value;

    if (e.target.name === "newPassword") {
      if (e.target.value === "" || e.target.value === undefined) {
        errorMSG[e.target.name] = "Password Is Required!";
      } else {
        if (e.target.value.length <= 7) {
          errorMSG[e.target.name] = "Minimum 8 Characters Is Required!";
        } else {
          errorMSG[e.target.name] = "";
        }
      }
    }

    if (e.target.name === "confirmNewPassword") {
      if (e.target.value === "" || e.target.value === undefined) {
        errorMSG[e.target.name] = "confirmPassword Is Required!";
      } else {
        if (user.newPassword !== user.confirmNewPassword) {
          errorMSG[e.target.name] = "Password Does't Match!";
        } else {
          errorMSG[e.target.name] = "";
        }
      }
    }

    setErrorMSG({ ...errorMSG });
    setUser({ ...user });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!user.newPassword || user.newPassword.trim() === "") {
      newErrors.newPassword = "Password is required!";
    } else if (user.newPassword.length <= 7) {
      newErrors.newPassword = "Minimum 8 Characters Is Required!";
    }

    if (!user.confirmNewPassword || user.confirmNewPassword.trim() === "") {
      newErrors.confirmNewPassword = "Confirm Password is required!";
    } else if (user.newPassword !== user.confirmNewPassword) {
      newErrors.confirmNewPassword = "Password Does't Match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMSG(newErrors);
      return;
    }

    axios
      .post(`http://localhost:7000/auth/reset-password/${id}`, user)
      .then((res) => {
        console.log("response", res);
        navigate(`/login`);
        toast.success(res.data.message);
        setSpin(false);
      })
      .catch((error) => {
        toast.error(
          error.response ? error.response.data.message : error.message
        );
        console.log(error, "error");
        setSpin(false);
      });

    setErrorMSG({});
    setSpin(true);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-7 min-h-screen bg-white font-[Poppins]">
        <form onSubmit={handleRegister} className="w-full max-w-md">
          <h2 className="text-[28px] font-[400] mb-2">Reset Password</h2>
          <p className="mb-10 mt-0 p-0 text-gray-600">
            Enter your new password for your account.
          </p>

          <div className="mb-7">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              onChange={getData}
              type="password"
              id="newPassword"
              name="newPassword"
              className="w-full px-3 py-2 placeholder:text-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018D43]"
              placeholder="Minimum 8 Characters"
            />
            <span className="text-red-500">{errorMSG.newPassword}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Re-enter Password
            </label>
            <input
              onChange={getData}
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              className="w-full px-3 py-2 placeholder:text-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018D43]"
              placeholder="Minimum 8 Characters"
            />
            <span className="text-red-500">{errorMSG.confirmNewPassword}</span>
          </div>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="text-[#018D43] focus:ring-[#018D43]"
              />
              <label
                className="cursor-pointer text-sm text-gray-700"
                htmlFor="rememberMe"
              >
                Remember Me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#018D43] text-white rounded-lg hover:bg-green-700 transition mt-12 font-semibold"
          >
            {spin ? (
              <Spin
                spinning={spin}
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 24, color: "#fff" }}
                    spin={spin}
                  />
                }
              />
            ) : (
              "Set Password"
            )}
          </button>
          <p className="mt-3 text-sm">
            Back to{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#018D43] cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2 min-h-screen">
        <img
          src={auth_img1}
          alt="Login"
          className="w-full object-cover object-center h-full"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
