import React, { useState } from "react";
import auth_img1 from "../../../public/image.jpg";
import google from "../../../public/authentication/google-logo.svg";
import facebook from "../../../public/authentication/facebook-logo.svg";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({});
  const [errorMSG, setErrorMSG] = useState({});
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  const getData = (e) => {
    user[e.target.name] = e.target.value;

    if (e.target.name === "name") {
      if (e.target.value === "" || e.target.value === undefined) {
        errorMSG[e.target.name] = "Name Is Required!";
      } else {
        if (e.target.value.length <= 4) {
          errorMSG[e.target.name] = "Minimum 5 Characters Is Required!";
        } else {
          errorMSG[e.target.name] = "";
        }
      }
    }

    if (e.target.name === "email") {
      if (e.target.value === "" || e.target.value === undefined) {
        errorMSG[e.target.name] = "Email Is Required!";
      } else {
        if (!e.target.value.includes(".com")) {
          errorMSG[e.target.name] = "Please Enter Valid Email!";
        } else {
          errorMSG[e.target.name] = "";
        }
      }
    }

    if (e.target.name === "password") {
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
    if (e.target.name === "confirmPassword") {
      if (e.target.value === "" || e.target.value === undefined) {
        errorMSG[e.target.name] = "confirmPassword Is Required!";
      } else {
        if (user.password !== user.confirmPassword) {
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

    if (!user.name || user.name.trim() === "") {
      newErrors.name = "Name is required!";
    } else if (user.name.length <= 4) {
      newErrors.name = "Minimum 5 Characters Is Required!";
    }

    if (!user.email || user.email.trim() === "") {
      newErrors.email = "Email is required!";
    } else if (!user.email.includes(".com")) {
      newErrors.email = "Please Enter Valid Email!";
    }

    if (!user.password || user.password.trim() === "") {
      newErrors.password = "Password is required!";
    } else if (user.password.length <= 7) {
      newErrors.password = "Minimum 8 Characters Is Required!";
    }

    if (!user.confirmPassword || user.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required!";
    } else if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Password Does't Match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMSG(newErrors);
      return;
    }
    axios.post("http://localhost:7000/auth/register", user).then((res) => {
      console.log("response", res);
      toast.success(res.data.message);
      navigate("/login");
      setSpin(false);
    }).catch((error) => {
      toast.error(error.response ? error.response.data.message : error.message);
      console.log(error, 'error');
      setSpin(false);
    })

    setErrorMSG({});
    setSpin(true);
  };

  return (
    <div className="flex flex-row w-full min-h-screen xl:h-screen">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-7 bg-white font-[Poppins]">
        <form onSubmit={handleRegister} className="w-full max-w-md h-auto">
          <h2 className="text-[28px] mb-2 font-[BelfastGrotesk]">Get Started Now</h2>
          <p className="mb-10 mt-0 p-0 text-gray-600">
            Enter your credentials to make your account
          </p>

          <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2 border-[2px] border-gray-300 px-3 py-1.5 rounded-xl cursor-pointer w-[100%] lg:w-fit">
              <img src={google} alt="Google" className="w-5 h-5" />
              <span className="text-sm">Log in with Google</span>
            </div>
            <div className="flex items-center gap-2 border-[2px] border-gray-300 px-3 py-1.5 rounded-xl cursor-pointer w-[100%] lg:w-fit">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
              <span className="text-sm">Log in with Facebook</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <hr className="border-[1px] border-gray-400 w-[43%]" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="border-[1px] border-gray-400 w-[43%]" />
          </div>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              onChange={getData}
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 placeholder:text-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018D43]"
              placeholder="Enter Name"
            />
            <span className="text-red-500">{errorMSG.name}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail Address
            </label>
            <input
              onChange={getData}
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 placeholder:text-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018D43]"
              placeholder="youremail@company.com"
            />
            <span className="text-red-500">{errorMSG.email}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              onChange={getData}
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 placeholder:text-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018D43]"
              placeholder="Minimum 8 Characters"
            />
            <span className="text-red-500">{errorMSG.password}</span>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Re-enter Password
            </label>
            <input
              onChange={getData}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 placeholder:text-gray-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#018D43]"
              placeholder="Minimum 8 Characters"
            />
            <span className="text-red-500">{errorMSG.confirmPassword}</span>
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
            <p onClick={() => navigate('/verify-email')} className="m-0 text-sm text-[#018D43] cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <div className="flex items-center gap-2 my-8">
            <input
              type="checkbox"
              name="termsPrivacy"
              id="termsPrivacy"
              className="text-[#018D43] focus:ring-[#018D43]"
            />
            <label className="cursor-pointer text-sm" htmlFor="termsPrivacy">
              I agree to the <span className="underline">Terms & Privacy</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#018D43] text-white rounded-lg hover:bg-green-700 transition font-semibold"
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
              "Sign Up"
            )}
          </button>

          <p className="mt-3 text-sm">Have an account ? <span onClick={() => navigate('/login')} className="text-[#018D43] cursor-pointer">Log in</span></p>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2 h-auto overflow-hidden">
        <img
          src={auth_img1}
          alt="Register"
          className="w-full object-cover object-center h-full"
        />
      </div>
    </div>
  );
};

export default Register;
