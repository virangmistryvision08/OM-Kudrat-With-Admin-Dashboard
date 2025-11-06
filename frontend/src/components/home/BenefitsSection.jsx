import React from "react";
import seedsImage from "../../../public/homeImage/seeds-circle.svg";

const BenefitsSection = () => {
  return (
    <section className="w-full py-20 bg-white font-[Poppins]">
      <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-6">
        
        {/* LEFT COLUMN */}
        <div className="w-full xl:w-1/4 space-y-4 xl:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold !leading-tight font-[BelfastGrotesk]">
            Organic <span className="text-green-600">Seeds</span><br />
            for Healthier<br />
            Gardens
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mt-4">
            Om Kudrat Seed & Spices, your ultimate destination for premium
            quality seeds and spices. Our e-commerce platform is designed to
            bring the rich flavors and health benefits of natural products
            straight to your doorstep.
          </p>
        </div>

        {/* CENTER COLUMN */}
        <div>
            <img src={seedsImage} alt="" />
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full xl:w-1/3 text-sm text-gray-600 leading-relaxed xl:text-left">
          <p>
            We pride ourselves on sourcing the finest seeds and spices, ensuring
            that each product meets the highest standards of purity and
            freshness. Whether you're a home cook looking to add a touch of
            authenticity to your dishes or a professional chef in search of
            exceptional ingredients, Om Kudrat has something for everyone.
          </p>
        </div>
      </div>
    </section>


// {/* CENTER COLUMN */}
//         <div className="relative flex items-center w-[100%] xl:w-[25%]">
//           {/* LABELS LEFT */}
//           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-2 text-right text-sm">
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[-100px] left-[-40px] w-[500px]">Healthy <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> </p>
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[-65px] left-[-94px] w-[500px]">Pure & Clean <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> </p>
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[-20px] left-[-108px] w-[500px]">Pesticide Free <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> </p>
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[30px] left-[-66px] w-[500px]">Nutrients <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> </p>
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[80px] left-[-63px] w-[500px]">Sustainable <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> </p>
//           </div>
//             <img src={leftCircle} alt="leftCircle" />
//           <img
//             src={seedsImage}
//             alt="Seeds"
//             className="w-[280px] md:w-[220px] object-cover z-10"
//           />
//             <img src={rightCircle} alt="rightCircle" />


//           {/* LABELS RIGHT */}
//           <div className="transform -translate-y-1/2 space-y-2 text-left text-sm">
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[-100px] left-[-30px] w-[500px]"> <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> Natural</p>
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[-65px] left-[-10px] w-[500px]"> <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> Organic</p>
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[-20px] left-[-5px] w-[500px]"> <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> Fresh</p>
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[30px] left-[-10px] w-[500px]"> <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> Heirloom</p>
//             <p className="text-gray-600 flex items-center gap-2 absolute top-[80px] left-[-33px] w-[500px]"> <span className="h-2 w-2 bg-[#018D43] rounded-full"></span> Chemical Free</p>
//           </div>
//         </div>
  );
};

export default BenefitsSection;
