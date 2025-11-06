import React, { useEffect } from "react";
import about_us_background_image from "../../public/aboutUs/about-us-background-image.jpg";
import about_us_healthy_section from "../../public/aboutUs/about-us-healthy-section.svg";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import star from "../../public/homeImage/Star.svg";
import chart from "../../public/aboutUs/chart.svg";
import user from "../../public/aboutUs/user.svg";
import experience from "../../public/aboutUs/experience.svg";
import trophy from "../../public/aboutUs/trophy.svg";
import natural_ingredients1 from "../../public/aboutUs/natural-ingredients1.svg";
import pure_organic1 from "../../public/aboutUs/pure-organic1.svg";
import experienced_test_checker1 from "../../public/aboutUs/experienced-test-checker1.svg";
import healthiest_product1 from "../../public/aboutUs/healthiest-product1.svg";
import natural_ingredients2 from "../../public/aboutUs/natural-ingredients2.svg";
import pure_organic2 from "../../public/aboutUs/pure-organic2.svg";
import experienced_test_checker2 from "../../public/aboutUs/experienced-test-checker2.svg";
import healthiest_product2 from "../../public/aboutUs/healthiest-product2.svg";
import { Collapse } from "antd";
import faqs_image from "../../public/aboutUs/faqs-image.jpg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Testimonial from "./home/Testimonial";
import Footer from "./Footer";
import { useMediaQuery } from "@mui/material";

const items = [
  {
    key: "1",
    label: "What shipping methods are available ?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
  {
    key: "2",
    label: "How do I track my order ?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
  {
    key: "3",
    label: "How can I be sure of the product quality?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
  ,
  {
    key: "4",
    label: "How will I know if order is placed successfully?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
  ,
  {
    key: "5",
    label: "Can I cancel my order?",
    children: (
      <p style={{ paddingInlineStart: 24 }}>
        Marwues rhues edites sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
        lacus vel facilisis.
      </p>
    ),
  },
];

const AboutUs = () => {
  const [expanded, setExpanded] = useState("1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const boxes = [
    {
      img: chart,
      numbers: "120+",
      description: "Pulses & Spices",
    },
    {
      img: user,
      numbers: "400+",
      description: "Customer Weekly",
    },
    {
      img: experience,
      numbers: "25+",
      description: "Years of Experience",
    },
    {
      img: trophy,
      numbers: "65+",
      description: "Awards Winning",
    },
  ];

  const choose = [
    {
      img1: natural_ingredients1,
      type: "Natural ingredients",
      description:
        "Quis enim lobortis scelerisque fermentum. Dolor sit amet consectetur adip RamAgree",
      img2: natural_ingredients2,
    },
    {
      img1: pure_organic1,
      type: "100% Pure organic",
      description:
        "Amet risus nullam eget felis eget nunc lobortis mattis aliquam elementum sagitt",
      img2: pure_organic2,
    },
    {
      img1: experienced_test_checker1,
      type: "Experienced Test-checker",
      description:
        "Nec sagittis aliquam malesuada bibendum arcu vitae elementum sit amet nisl purus in",
      img2: experienced_test_checker2,
    },
    {
      img1: healthiest_product1,
      type: "Healthiest Product",
      description:
        "Quis enim lobortis scelerisque fermentum. Dolor sit amet consectetur adip RamAgree",
      img2: healthiest_product2,
    },
  ];

  return (
    <>
      <section className="w-full mt-24 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <section
            className="relative bg-white min-h-72 rounded-2xl"
            style={{
              backgroundImage: `url("${about_us_background_image}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">About Us</h1>
              <p className="text-xs mt-2">Home > About Us</p>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row justify-between gap-10 items-center my-14 lg:my-20">
            <div className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 px-4 py-1 border border-gray-400 bg-white rounded-full text-sm mb-4">
                <img src={star} alt="star" className="w-4 h-4" />
                About Om Kudrat
              </span>
              <div>
                <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-[BelfastGrotesk]">
                  We Are <h1 className="text-[#018D43]">Natural</h1>
                </h1>
                <h1 className="flex items-center text-3xl md:text-4xl font-[BelfastGrotesk]">
                  & <h1 className="text-[#018D43] ms-3">Healthy</h1>.
                </h1>
              </div>
              <hr className="my-8 w-1/2 md:w-1/4 border-2 border-gray-200" />
              <p className=" text-gray-600">
                Om kudrat is the best place to buy premium quality dry fruits
                online. At Om kudrat, we aim to provide the best quality dry
                fruits, nuts, and seeds. Along with this we also make sure that
                only the best product reaches our customers. Each product of Om
                kudrat is handpicked and purely natural. Such efforts of Om
                kudrat, establish a benchmark of credibility among its
                customers, making it the best place to buy dry fruits online in
                India. 
              </p>
              <p className="my-4 text-gray-600">
                Being the best healthy snack store online, Om kudrat comes up
                with a wide range of dry fruits, nuts, and seeds.
              </p>
              <button className="bg-[#018D43] text-white px-7 py-3 rounded-full mt-5">
                Read More
              </button>
            </div>
            <div className="relative flex justify-center items-center rounded-xl w-full md:w-1/2 lg:w-auto">
              <img
                className="object-cover"
                src={about_us_healthy_section}
                alt="healthy section"
              />
              <div className="absolute backdrop-blur-lg backdrop-brightness-50 p-2 lg:px-7 !rounded-2xl text-center border border-white text-white">
                <h1 className="text-xl lg:text-2xl font-[BelfastGrotesk] font-[400]">
                  25+
                </h1>
                <p className="text-xs font-[400] mt-2 text-gray-300">
                  Years Of <br /> Experience
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-10 lg:mb-20">
            {boxes.map((box) => {
              return (
                <div className="text-center p-3 bg-gray-100 rounded-2xl h-[200px] flex flex-col justify-center items-center">
                  <img
                    className="mx-auto mb-3"
                    src={box.img}
                    alt={box.numbers}
                  />
                  <p className="text-2xl font-bold font-[BelfastGrotesk]">
                    {box.numbers}
                  </p>
                  <span className="text-sm mt-1 text-gray-600">
                    {box.description}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="my-20 lg:my-20">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center">
              <div className="lg:w-1/2">
                <span className="inline-flex items-center gap-2 px-4 py-1 border border-gray-400 bg-white rounded-full text-sm mb-4">
                  <img src={star} alt="star" className="w-4 h-4" />
                  Choose Om Kudrat
                </span>
                <h1 className="font-[BelfastGrotesk] flex items-center m-0 p-0 gap-2 text-2xl md:text-3xl">
                  Why <h1 className="text-[#018D43]">People choose</h1> Us
                </h1>
              </div>
              <p className="lg:w-1/2 mt-3 lg:mt-0 lg:text-end text-gray-600 text-sm">
                “While growing up, I have seen my father selecting only the best
                of Pluses and Spices to be packaged and sold, his motto has
                always been providing best quality and making sure only best
                products reach to the customers.”
              </p>
            </div>
            <div className="mt-10 lg:mt-10 grid grid-cols-1 xl:grid-cols-2 gap-5">
              {choose.map((item) => {
                return (
                  <>
                    <div
                      style={{
                        backgroundImage: `linear-gradient(to left, #c6cfca85, #d6d6d614, white), url("${item.img2}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundSize: "contain",
                      }}
                      className="relative md:!bg-none flex flex-col md:flex-row items-end md:items-center gap-3 md:gap-7 bg-[#F8F8F8] rounded-3xl ps-4 md:ps-8 py-4 md:py-0"
                    >
                      <img
                        className="me-auto"
                        src={item.img1}
                        alt={item.type}
                      />
                      <div className="pe-4 md:pe-0">
                        <h1 className="text-xl md:text-2xl text-[#05a04d] md:text-[#018D43]">
                          {item.type}
                        </h1>
                        <p className="text-black md:text-gray-500 text-xs md:text-sm mt-1 md:mt-2">
                          {item.description}
                        </p>
                      </div>
                      <img
                        className="hidden md:block"
                        src={item.img2}
                        alt={item.type}
                      />
                      {/* <div className='absolute inset-0 bg-[#b3b3b3] rounded-3xl bg-opacity-30 z-0'>

                                                </div> */}
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 items-center justify-between mb-14 md:mb-20">
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 px-2 py-1 border border-gray-400 bg-white rounded-full text-xs mb-0">
                  <img src={star} alt="star" className="w-4 h-4" />
                  FAQ’s
                </span>
                <h1 className="text-3xl xl:text-4xl leading-snug font-[BelfastGrotesk]">
                  Frequently Asked <h1 className="text-[#018D43]">Questions</h1>
                </h1>
              </div>

              <img
                className="w-[400px] h-[380px] object-cover object-top rounded-3xl mt-10"
                src={faqs_image}
                alt="FAQ's"
              />
            </div>

            <div className="w-full lg:w-1/2 2xl:w-[70%] !h-full overflow-y-auto">
              {items.map((item) => (
                <Accordion
                  key={item.key}
                  expanded={expanded === item.key}
                  onChange={handleChange(item.key)}
                  disableGutters
                  elevation={0}
                  sx={{
                    "&:before": { display: "none" },
                    borderBottom: "1px solid black",
                    paddingBlock: 2,
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      expanded === item.key ? (
                        <RemoveCircleOutline className="text-[#018D43]" />
                      ) : (
                        <AddCircleOutline className="text-[#018D43]" />
                      )
                    }
                    sx={{
                      flexDirection: "row-reverse",
                      "& .MuiAccordionSummary-content": {
                        marginY: "12px",
                        marginLeft: 5,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: "18px",
                        color: expanded === item.key ? "#018D43" : "inherit",
                        fontFamily:
                          expanded === item.key ? "BelfastGrotesk" : "Poppins",
                        lineHeight: "24px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.label}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography
                    className="!font-[Poppins]"
                      sx={{
                        color: "gray",
                        fontSize: 14,
                        paddingInlineStart: 5,
                      }}
                    >
                      {item.children}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Testimonial />
      <Footer />
    </>
  );
};

export default AboutUs;
