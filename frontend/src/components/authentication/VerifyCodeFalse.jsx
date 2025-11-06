import React, { useState } from "react";
import auth_img1 from "../../../public/image.jpg";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyCodeFalse = () => {
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();

  const handleVerifyEmail = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:7000/auth/verify-email", { email })
      .then((res) => {
        console.log("response", res);
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
    setSpin(true);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center h-fit min-h-screen p-7 bg-white font-[Poppins]">
        <form
          onSubmit={handleVerifyEmail}
          className="w-full xl:w-[40%] max-w-md"
        >
          <h2 className="text-[28px] font-[BelfastGrotesk] mb-2">Verify Code</h2>
          <p className="mb-10 mt-0 p-0 text-gray-600">
            Enter your verification code that we sent you through your e-mail.
          </p>

          <div className="mb-7">
            <p className="text-3xl text-[#018D43] m-0">
              {email ? email : "abc.abc@gmail.com"}
            </p>
            <br />
            <span>Didn’t receive the email?</span>
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
              "Resend Verification"
            )}
          </button>
          <p className="mt-7 text-sm">
            Back to{" "}
            <span
              onClick={() => navigate("/verify-email")}
              className="text-[#018D43] cursor-pointer"
            >
              Forgot Password
            </span>
          </p>
          <p className="mt-3 text-sm">
            Back to{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#018D43] cursor-pointer"
            >
              Log in
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

export default VerifyCodeFalse;
