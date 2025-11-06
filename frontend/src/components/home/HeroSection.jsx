import React from "react";
import hero_section_rounded from "../../../public/homeImage/hero-section-rounded.png";
import heroSection1 from "../../../public/homeImage/heroSection1.jpg";
import heroSection2 from "../../../public/homeImage/heroSection2.jpg";
import star from "../../../public/homeImage/Star.svg";
import heromail from "../../../public/homeImage/heromail.svg";
import heroDownArrow from "../../../public/homeImage/heroDownArrow.svg";
import exploreProduct from "../../../public/homeImage/exploreProduct.svg";
import up_arrow from "../../../public/homeImage/arrow-up.svg";
import up_arrow_white from "../../../public/homeImage/arrow-up-white.svg";

const HeroSection = () => {
  return (
    <div className="w-full pt-[65px] md:pt-[73px] font-[Poppins]">
      <div className="w-[90%] lg:w-[80%] mx-auto pt-[40px] flex flex-col lg:flex-row gap-6 relative">
        
        {/* LEFT SECTION */}
        <div className="w-full lg:w-[70%] relative flex justify-center lg:justify-end">
          {/* HERO IMAGE */}
          <div className="relative rounded-xl overflow-hidden w-full lg:w-[60%] xl:w-[70%] 2xl:w-[75%] h-[450px] sm:h-[500px] lg:h-auto">
            <img
              src={hero_section_rounded}
              alt="Spices"
              className="hidden lg:block w-full h-full object-cover"
            />
            <img
              src={heroSection1}
              alt="Spices"
              className="block lg:hidden w-full h-full object-cover"
            />

            {/* TEXT OVERLAY FOR MOBILE */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:hidden bg-black/30 backdrop-blur-sm text-white">
              <div className="flex gap-2 mb-3">
                <span className="bg-white/80 text-black flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm">
                  <img src={star} alt="Seeds" className="w-3 h-3" />
                  Seeds
                </span>
                <span className="bg-white/80 text-black flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm">
                  <img src={star} alt="Organic" className="w-3 h-3" />
                  Organic
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-semibold uppercase leading-tight">
                <p>
                  <span className="text-[#4ADE80]">PLUSes & Spices</span>: Fresh
                </p>
                <p>
                  Flavours,<span className="text-[#4ADE80]"> Endless</span>
                </p>
                <p>Possibilities</p>
              </div>

              <p className="text-sm mt-3 text-gray-100 w-[80%] sm:w-[60%]">
                Revamp your taste buds with delightful experiences.
              </p>

              <div className="flex gap-3 mt-5">
                <button className="bg-[#018D43] text-white rounded-full px-4 py-2 text-sm">
                  Shop Now
                </button>
                <button className="border border-gray-200 rounded-full px-4 py-2 text-sm">
                  Explore
                </button>
              </div>
            </div>

            {/* Desktop overlays */}
            <div className="absolute flex items-center gap-2 bottom-4 left-4 bg-black/30 px-3 py-1 rounded-full text-sm text-white backdrop-blur-md">
              <img src={star} alt="" /> Purity is our tradition
            </div>
            <div className="absolute top-4 right-4 bg-white/60 text-gray-800 rounded-xl px-4 py-3 text-sm shadow backdrop-blur-md hidden lg:block">
              <strong className="text-[25px] font-semibold">24K</strong>
              <img className="absolute top-2 right-2 w-4" src={up_arrow} alt="up_arrow" />
              <br />
              <span className="text-xs">Total Sale of Last Month</span>
            </div>
          </div>

          {/* TEXT SECTION for Desktop */}
          <div className="hidden lg:block absolute left-0 top-4 z-10">
            <div className="flex items-center gap-0 mb-3">
              <span className="bg-white border border-gray-500 flex items-center gap-2 px-3 py-1 rounded-full">
                <img src={star} alt="Seeds" />
                <span>Seeds</span>
              </span>
              <span className="bg-white border border-gray-500 flex items-center gap-2 px-3 py-1 rounded-full">
                <img src={star} alt="Organic" />
                <span>Organic</span>
              </span>
            </div>

            <div className="font-[BelfastGroteskBold] lg:text-[1.5rem] lg:leading-[60px] xl:text-[2rem] xl:leading-[60px] 2xl:text-[2.60rem] 2xl:leading-[70px] uppercase">
              <p>
                <span className="text-[#018D43]">PLUSes & Spices</span>: Fresh
              </p>
              <p>
                Flavours,<span className="text-[#018D43]"> Endless</span>
              </p>
              <p>Possibilities</p>
            </div>
            <hr className="w-[40%] mt-5 border-[1.5px] rounded-full" />
            <p className="w-[45%] mt-2 text-sm">
              Revamp your best taste buds with delightful experience.
            </p>
            <div className="flex mt-8 gap-0">
              <button className="bg-[#018D43] text-white rounded-full lg:px-3 py-2">
                Shop Now
              </button>
              <button className="border border-gray-500 rounded-full lg:px-3 py-2 font-semibold text-gray-600">
                Explore
              </button>
            </div>
            <div className="flex mt-5 gap-0">
              <img src={heromail} alt="" />
              <img src={heroDownArrow} alt="" />
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[30%] flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div>
              <h5 className="font-semibold text-lg">Natural Spice</h5>
              <hr className="border-gray-400 my-1 w-[50%]" />
              <span className="text-sm text-gray-600">
                We are focusing on natural spice
              </span>
            </div>
            <div>
              <img src={exploreProduct} alt="exploreProduct" />
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden h-80 sm:h-96 mt-5">
            <img
              src={heroSection2}
              alt="Spice Set"
              className="w-full h-full object-cover"
            />
            <div className="absolute flex items-center gap-2 top-4 left-4 bg-white/40 px-3 py-1 rounded-full text-sm text-white backdrop-blur-md">
              <img src={star} alt="" /> Healthy
            </div>
            <div className="absolute bottom-4 right-4 w-[45%] border backdrop-blur-sm border-gray-400 bg-slate-800/80 text-gray-300 rounded-xl px-4 py-2 text-sm shadow">
              <p className="text-start mb-1 text-xl">17</p>
              <img
                className="absolute top-3 right-3 h-[20px]"
                src={up_arrow_white}
                alt="up_arrow"
              />
              <p className="text-xs text-start">
                Winning Awards & Certificates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
