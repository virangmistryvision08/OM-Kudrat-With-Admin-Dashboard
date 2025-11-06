import React from "react";
import testimonial1 from "../../../public/testimonial/testimonial1.jpg";
import testimonial2 from "../../../public/testimonial/testimonial2.jpg";
import testimonial3 from "../../../public/testimonial/testimonial3.jpg";

const Testimonial = () => {
  return (
    <div className="w-full pb-20 bg-white">
      <div className="w-[92%] sm:w-[90%] lg:w-[80%] mx-auto font-[Poppins]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-0 mb-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 font-[BelfastGrotesk]">
            Testimonial
          </h2>
          <p className="text-gray-600 w-full lg:w-[28%] text-sm md:text-base lg:text-end leading-relaxed mt-2 lg:mt-0">
            Made using clean, non-toxic ingredients, our products are designed
            for everyone.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {/* Left Card */}
          <div className="w-full lg:w-[55%] rounded-2xl bg-[#F8F6F1] p-5 lg:p-7 flex flex-col justify-between gap-5">
            <p className="text-base font-[450] sm:text-lg lg:text-2xl 2xl:text-3xl !leading-normal text-gray-800 font-[BelfastGrotesk]">
              “ I've been a loyal customer of Om Kudrat Pulses & Spices for over
              a year now, and I couldn't be happier with their products. The
              quality of their spices is unmatched, and the freshness is evident
              in every meal I prepare. ”
            </p>
            <div className="flex items-center gap-3">
              <img
                className="h-[55px] w-[55px] lg:h-[60px] lg:w-[60px] object-cover rounded-lg"
                src={testimonial3}
                alt="Anjali Patel"
              />
              <div>
                <h5 className="text-[1rem] font-semibold m-0">Anjali Patel</h5>
                <span className="text-[0.8rem] text-gray-500">House Wife</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[45%] rounded-2xl bg-[#E3F6EA] p-3 flex flex-col">
            <img
              className="rounded-xl h-48 sm:h-60 w-full object-cover"
              src={testimonial2}
              alt="Rajesh Kumar"
            />
            <div className="p-3 flex flex-col justify-between gap-4 mt-3 flex-grow">
              <p className="text-base font-[450] sm:text-lg lg:text-xl leading-relaxed text-gray-800 font-[BelfastGrotesk]">
                “ As a professional chef, Om Kudrat Pulses & Spices has
                consistently delivered top-notch products that meet my high
                standards. ”
              </p>
              <div>
                <h5 className="text-[1rem] font-semibold m-0">Rajesh Kumar</h5>
                <span className="text-[0.8rem] text-gray-500">
                  Professional Chef
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row justify-between gap-3">
          <div className="rounded-2xl w-full lg:w-[70%] bg-[#E1E7F8] p-4 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="w-full h-full sm:w-1/2 flex flex-col justify-between gap-5">
              <p className="text-base font-[450] sm:text-lg md:text-2xl leading-relaxed text-gray-800 font-[BelfastGrotesk]">
                "Om Kudrat Pulses & Spices has transformed my cooking. The
                difference in quality compared to other brands is incredible.”
              </p>
              <div>
                <h5 className="text-[1rem] font-semibold m-0">Meera Singh</h5>
                <span className="text-[0.8rem] text-gray-500">House Wife</span>
              </div>
            </div>
            <img
              className="rounded-xl h-72 sm:h-60 object-cover w-full sm:w-auto"
              src={testimonial1}
              alt="Meera Singh"
            />
          </div>

          <div className="rounded-2xl w-full lg:w-[28%] bg-[#1C1A1F] flex flex-col justify-between items-start gap-5 p-6 text-white">
            <p className="text-2xl md:text-3xl font-semibold leading-snug font-[BelfastGrotesk]">
              Explore Our Community
            </p>
            <button className="bg-[#018D43] text-white px-6 py-2 rounded-full mt-4 hover:bg-green-700 transition">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
