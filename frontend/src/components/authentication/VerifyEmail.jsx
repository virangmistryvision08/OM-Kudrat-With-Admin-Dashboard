import React, { useState } from "react";
import auth_img1 from "../../../public/image.jpg";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [user, setUser] = useState({});
  const [errorMSG, setErrorMSG] = useState({});
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  const getData = (e) => {
    user[e.target.name] = e.target.value;

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

    setErrorMSG({ ...errorMSG });
    setUser({ ...user });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!user.email || user.email.trim() === "") {
      newErrors.email = "Email is required!";
    } else if (!user.email.includes(".com")) {
      newErrors.email = "Please Enter Valid Email!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrorMSG(newErrors);
      return;
    }
    axios.post("http://localhost:7000/auth/verify-email", user).then((res) => {
      console.log("response", res);
      toast.success(res.data.message);
      navigate(`/verify-code-false/${user.email}`);
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
    <div className="flex flex-col-reverse md:flex-row w-full md:min-h-screen">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen p-7 bg-white font-[Poppins]">
        <form onSubmit={handleRegister} className="w-full max-w-md">
          <h2 className="text-[25px] font-[BelfastGrotesk] mb-3">Forgot Password ?</h2>
          <p className="mb-10 mt-0 p-0 text-gray-600">
            No worries, we’ll send you eset instructions.
          </p>

          <div className="mb-7">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
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

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#018D43] text-white rounded-lg hover:bg-green-700 transition font-semibold"
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
              "Send E-mail"
            )}
          </button>
          <p className="mt-3 text-sm">
            Back to{" "}
            <span onClick={() => navigate('/login')} className="text-[#018D43] cursor-pointer">Log in</span>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2 h-screen">
        <img
          src={auth_img1}
          alt="Virefication"
          className="w-full h-screen object-cover object-center"
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
