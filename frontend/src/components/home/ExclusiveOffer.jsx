import React, { useEffect, useState } from "react";
import exclusiveOffer from "../../../public/homeImage/exclusive-offers.jpg";

const ExclusiveOffer = () => {

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
    ? `linear-gradient(to left, #ffffff87, #ffffff87), url("${exclusiveOffer}")`
    : `url("${exclusiveOffer}")`;

  return (
    <section className="w-full pb-20 font-[Poppins]">
      <div
        className="w-[90%] lg:w-[80%] min-h-[54vh] rounded-2xl mx-auto flex items-center justify-center"
        style={{
          backgroundImage,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-[100%] md:w-[60%] xl:w-[50%] 2xl:w-[40%] text-center">
          <h2 className="font-[600] text-[1.5rem] md:text-[1.9rem] font-[BelfastGroteskBold]">Stay Up to Date with All News and Exclusive Offers</h2>
          <div className="flex mt-4 relative items-center">
            <input
              className="outline-none border rounded-full ps-4 pr-[110px] md:pr-[130px] w-full h-[65px] bg-black/50 lg:bg-black/30 placeholder:text-white text-white text-sm sm:text-base"
              type="email"
              placeholder="Enter your email address"
            />
            <button className="absolute top-1/2 -translate-y-1/2 right-2 bg-white text-black h-[45px] sm:h-[50px] px-4 sm:px-5 lg:px-6 rounded-full hover:bg-green-700 hover:text-white transition text-sm sm:text-base whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffer;
