import React from "react";
import arrow_up from "../../public/homeImage/arrow-up.svg";
import facebook from "../../public/footer/facebook.svg";
import linked_in from "../../public/footer/linked-in.svg";
import twitter from "../../public/footer/twitter.svg";
import youtube from "../../public/footer/youtube.svg";
import om_kudrat_logo from "../../public/om_kudrat_logo.svg";
import icon_pay from "../../public/footer/icon-pay.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full pb-3">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="flex flex-col xl:flex-row justify-between">
          <div className="flex flex-col justify-between min-h-[26vh] md:min-h-[29vh]">
            <div className="font-[BelfastGrotesk]">
              <h1 className="flex font-semibold gap-2 m-0 text-[1.75rem] !leading-relaxed md:text-[2.3rem] xl:text-[2.2rem]">
                Fresh <p className="text-[#018D43]">Flavour</p>
              </h1>
              <h1 className="flex font-semibold gap-2 -mt-4 text-[1.75rem] !leading-relaxed md:text-[2.3rem] xl:text-[2.2rem]">
                Endless <p className="text-[#018D43]">Possibilities</p>
              </h1>
              <p className="font-[Poppins] w-[80%] mt-3">
                Revamp your best test buds with delightful experience
              </p>
            </div>
            <button className="border flex items-center gap-4 rounded-full py-2 px-4 w-fit font-[Poppins]">
              Find A Store{" "}
              <img className="h-[22px]" src={arrow_up} alt="Arrow-Up" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-5 w-[100%] xl:w-[60%] mt-5 md:mt-3">
            <div>
              <h4 className="font-[BelfastGrotesk] text-[1.2rem]">Company</h4>
              <div className="font-[Poppins] mt-3 flex flex-col gap-3 text-gray-500">
                <span className="cursor-pointer" onClick={() => navigate("/about-us")}>About Us</span>
                <span>Shop</span>
                <span>Store Locations</span>
                <span className="cursor-pointer" onClick={() => navigate("/blog")}>Our Blog</span>
                <span>Reviews</span>
              </div>
            </div>
            <div>
              <h4 className="font-[BelfastGrotesk] text-[1.2rem]">Useful Links</h4>
              <div className="font-[Poppins] mt-3 flex flex-col gap-3 text-gray-500">
                <span>New Products</span>
                <span>Best Seller</span>
                <span>Bundle & Save</span>
                <span>Online Gift</span>
              </div>
            </div>
            <div>
              <h4 className="font-[BelfastGrotesk] text-[1.2rem]">Information</h4>
              <div className="font-[Poppins] mt-3 flex flex-col gap-3 text-gray-500">
                <span>Start a Return</span>
                <span className="cursor-pointer" onClick={() => navigate("/contact-us")}>Contact Us</span>
                <span className="cursor-pointer" onClick={() => navigate("/faqs")}>Shipping FAQs</span>
                <span>Terms & Conditions</span>
                <span>Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center mt-5">
          <div className="flex items-center">
            <img src={facebook} alt="facebook" />
            <img src={linked_in} alt="linked_in" />
            <img src={youtube} alt="youtube" />
            <img src={twitter} alt="twitter" />
          </div>
          <div>
            <img src={om_kudrat_logo} alt="OM Kudrat Logo" />
          </div>
          <div>
            <img src={icon_pay} alt="icon_pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
