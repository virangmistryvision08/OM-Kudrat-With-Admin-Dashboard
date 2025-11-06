import React, { useState } from "react";
import auth_img1 from "../../../public/image.jpg";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyCodeTrue = () => {
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Handle OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus automatically
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle Backspace focus move
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Verify code function
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Join all 4 digits

    if (!otpCode || otpCode.length < 4) {
      toast.error("OTP Is Required!");
      return;
    }

    setSpin(true);
    try {
      const res = await axios.post(
        `http://localhost:7000/auth/verify-otp/${id}`,
        { otp: otpCode }
      );
      toast.success(res.data.message);
      navigate(`/reset-password/${id}`);
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : error.message
      );
    } finally {
      setSpin(false);
      setOtp(["", "", "", ""]);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center min-h-screen p-6 md:p-12 bg-white font-[Poppins]">
        <form onSubmit={handleVerifyCode} className="w-full max-w-sm">
          <h2 className="text-[28px] font-[BelfastGrotesk] mb-2">
            Verify Code
          </h2>
          <p className="mb-10 text-gray-600">
            Enter the verification code sent to your email.
          </p>

          {/* OTP Inputs */}
          <div className="flex gap-4 md:gap-6 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-16 w-14 text-center text-3xl font-semibold border-2 border-green-600 rounded-lg bg-gray-100
                           focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ease-in-out"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#018D43] text-white rounded-lg hover:bg-green-700 transition font-semibold flex justify-center items-center"
            disabled={spin}
          >
            {spin ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 24, color: "#fff" }}
                    spin={spin}
                  />
                }
              />
            ) : (
              "Verify Code"
            )}
          </button>

          <p className="mt-3 text-sm text-center">
            Back to{" "}
            <span
              onClick={() => navigate("/verify-email")}
              className="text-[#018D43] cursor-pointer hover:underline"
            >
              Forgot Password
            </span>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2 min-h-screen">
        <img
          src={auth_img1}
          alt="Verification"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default VerifyCodeTrue;
