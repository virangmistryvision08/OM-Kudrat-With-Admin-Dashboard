import React from "react";
import contact_us_background_image from "../../public/contactUs/contact-us-background-image.jpg";
import star from "../../public/homeImage/Star.svg";
import home from "../../public/contactUs/Home.svg";
import clock from "../../public/contactUs/clock.svg";
import call_calling from "../../public/contactUs/call-calling.svg";
import sms from "../../public/contactUs/sms.svg";
import fb from "../../public/contactUs/fb.svg";
import insta from "../../public/contactUs/insta.svg";
import twitter from "../../public/contactUs/twitter.svg";
import youtube from "../../public/contactUs/youtube.svg";
import BlackFridayOffer from "./home/BlackFridayOffer";
import Footer from "./Footer";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ContactUs = () => {
  const [data, setData] = useState({});
  const [errMessage, setErrMessage] = useState({});

  const getdata = (e) => {
    const { name, value } = e.target;

    const newData = { ...data, [name]: value };
    const newErrors = { ...errMessage };

    if (!value || value.trim() === "") {
      newErrors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } is required!`;
    } else {
      if (name === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email format!";
        } else {
          newErrors.email = "";
        }
      } else {
        newErrors[name] = "";
      }
    }

    setData(newData);
    setErrMessage(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!data.name || data.name.trim() === "") {
      newErrors.name = "Name is required!";
    }

    if (!data.email || data.email.trim() === "") {
      newErrors.email = "Email is required!";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!data.question || data.question.trim() === "") {
      newErrors.question = "Question is required!";
    }

    setErrMessage(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("All Fieled Required!");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/contact-us/add-question`, data)
      .then((res) => {
        console.log(res.data, "response");
      })
      .catch((error) => {
        console.log(error, "error");
      });

    setData({});
  };

  return (
    <>
      <section className="w-full mt-24 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <section
            className="relative bg-white min-h-72 rounded-2xl"
            style={{
              backgroundImage: `url("${contact_us_background_image}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">Contact Us</h1>
              <p className="text-xs mt-2">Home &gt; Contact Us</p>
            </div>
          </section>

          <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 items-center my-14 lg:my-20 overflow-hidden">
            <div className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 px-4 py-1 border border-gray-400 bg-white rounded-full text-sm mb-4">
                <img src={star} alt="star" className="w-4 h-4" />
                Connect With Om Kudrat
              </span>
              <div>
                <h1 className="flex items-center gap-3 text-2xl md:text-3xl lg:text-2xl xl:text-4xl font-[BelfastGrotesk]">
                  Get In <h1 className="text-[#018D43]">Touch</h1> With Us
                </h1>
              </div>
              <hr className="my-6 w-1/2 md:w-1/4 border-2 border-gray-200" />
              <p className=" text-gray-600">
                Your email address will not be published. Required fields are
                marked*
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-5"
                action=""
              >
                <div>
                  <input
                    name="name"
                    onChange={getdata}
                    className={`w-full ${
                      errMessage.name
                        ? "outline-[#e91d1d]"
                        : "outline-[#018D43]"
                    } border border-gray-300 rounded-full placeholder:text-gray-500 !font-[400] placeholder:text-sm px-4 py-3`}
                    type="text"
                    placeholder="Your Name*"
                  />
                  <p className="text-red-500 text-sm ms-4">{errMessage.name}</p>
                </div>

                <div>
                  <input
                    name="email"
                    onChange={getdata}
                    className="w-full outline-[#018D43] border border-gray-300 rounded-full placeholder:text-gray-500 !font-[400] placeholder:text-sm px-4 py-3"
                    type="text"
                    placeholder="Your Email*"
                  />
                  <p className="text-red-500 text-sm ms-4">
                    {errMessage.email}
                  </p>
                </div>

                <div>
                  <textarea
                    name="question"
                    onChange={getdata}
                    className="w-full outline-[#018D43] border border-gray-300 rounded-3xl placeholder:text-gray-500 !font-[400] placeholder:text-sm px-4 py-3 min-h-32"
                    placeholder="Question*"
                    id=""
                  ></textarea>
                  <p className="text-red-500 text-sm ms-4">
                    {errMessage.question}
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-[#018D43] text-white w-fit px-7 py-3 rounded-full"
                >
                  Send Message
                </button>
              </form>
            </div>
            <iframe
              className="rounded-2xl h-52 md:h-80 lg:h-96 w-full lg:w-1/2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d378.2265895210637!2d72.84249545774274!3d21.196808276046106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ef22a0178b1%3A0x2f02ec2c91fcd100!2sVision%20Infotech!5e0!3m2!1sen!2sin!4v1761055425289!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 my-10 lg:my-20">
            <div className="w-full lg:w-1/2">
              <h1 className="text-2xl font-[BelfastGrotesk]">Contact Us</h1>
              <div className="mt-7 grid grid-cols-1 xl:grid-cols-2 gap-0 gap-x-10">
                <div>
                  <div className="flex items-start gap-5">
                    <img src={home} alt="home" />
                    <div>
                      <p>Address</p>
                      <span className="text-gray-600 text-sm">
                        7563 St. Vicent Place, Glasgow
                      </span>
                    </div>
                  </div>
                  <hr className="w-full my-3 border" />
                </div>
                <div>
                  <div className="flex items-start gap-5">
                    <img src={clock} alt="clock" />
                    <div>
                      <p>Hours</p>
                      <span className="text-gray-600 text-sm">
                        7 Days a week from 10:00 am to 6:00 pm
                      </span>
                    </div>
                  </div>
                  <hr className="w-full my-3 border" />
                </div>
                <div>
                  <div className="flex items-start gap-5">
                    <img src={call_calling} alt="phone" />
                    <div>
                      <p>Phone</p>
                      <span className="text-gray-600 text-sm">
                        +09123 456 789
                      </span>
                    </div>
                  </div>
                  <hr className="w-full my-3 border xl:hidden" />
                </div>
                <div>
                  <div className="flex items-start gap-5">
                    <img src={sms} alt="sms" />
                    <div>
                      <p>E-mail</p>
                      <span className="text-gray-600 text-sm">
                        zemes@demolink.org
                      </span>
                    </div>
                  </div>
                  <hr className="w-full my-3 border xl:hidden" />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-gray-100 p-5 rounded-3xl">
              <h1 className="text-2xl font-[BelfastGrotesk]">Follow Us</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5 mt-7">
                <div>
                  <div className="flex items-center gap-3">
                    <img src={fb} alt="Facebook" />
                    <span className="text-sm">Follow Us On Facebook</span>
                  </div>
                  <hr className="mt-5 w-full xl:w-[75%] border border-gray-300" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <img src={insta} alt="Instagram" />
                    <span className="text-sm">Follow Us On Insatgram</span>
                  </div>
                  <hr className="mt-5 w-full xl:w-[80%] border border-gray-300" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <img src={twitter} alt="Twitter" />
                    <span className="text-sm">Join Us On Twitter</span>
                  </div>
                  <hr className="mt-5 w-full xl:hidden border border-gray-300" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <img src={youtube} alt="Youtube" />
                    <span className="text-sm">Follow Us On Youtube</span>
                  </div>
                  <hr className="mt-5 w-full xl:hidden border border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BlackFridayOffer overlay={false} />
      <Footer />
    </>
  );
};

export default ContactUs;
