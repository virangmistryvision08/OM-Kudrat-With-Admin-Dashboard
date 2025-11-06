import React, { useEffect, useState } from "react";
import blackFridayOfferImage1 from "../../../public/homeImage/black-friday-offer1.jpg";
import blackFridayOfferImage2 from "../../../public/homeImage/black-friday-offer2.jpg";
import star from "../../../public/homeImage/black-friday-star.svg";

const BlackFridayOffer = ({ overlay }) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const backgroundImage = isMobileOrTablet
    ? `linear-gradient(to left, #ffffff87, #ffffff87), url("${overlay ? blackFridayOfferImage1 : blackFridayOfferImage2}")`
    : `url("${overlay ? blackFridayOfferImage1 : blackFridayOfferImage2}")`;

  return (
    <div className="w-full pb-24 px-0 rounded-3xl font-[Poppins]">
      <div
        className="relative w-[90%] lg:w-[80%] min-h-[65vh] rounded-xl overflow-hidden mx-auto"
        style={{
          backgroundImage,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {
          overlay ? <div className="absolute inset-0 bg-[#fcb99b] bg-opacity-20 z-0"></div> : <div className="absolute inset-0 bg-[#fff] bg-opacity-30 lg:bg-opacity-10 z-0"></div>
        }

        <div className="relative z-10 p-14">
          <div className="space-y-4 w-full md:w-1/2">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 border-2 border-gray-300 px-3 py-1 rounded-full text-sm font-medium w-fit">
              <img src={star} alt="star" className="w-4 h-4 bg-transparent" />
              Black Friday
            </div>

            {/* Headline */}
            <h2 className="text-xl sm:text-4xl xl:text-5xl font-bold text-black font-[BelfastGroteskBold] ">
              Sale <span className="">50% OFF</span>
            </h2>

            {/* Subheadline */}
            <p className="text-lg lg:text-2xl text-black">
              All Pulses & Spices Products
            </p>
          </div>
        </div>
        {/* CTA Button */}
        <button className="absolute bottom-12 left-12 my-auto bg-[#018D43] text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
          Discover Now
        </button>
      </div>
    </div>
  );
};

export default BlackFridayOffer;
