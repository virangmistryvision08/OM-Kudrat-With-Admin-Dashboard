import React from "react";
import arrow_up from "../../public/homeImage/arrow-up.svg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";

const Product = ({
  productId,
  productImage,
  productName,
  productOldPrice,
  productNewPrice,
  isSale,
  bestSellingProduct,
  showWishlist,
  showArrow,
  slug
}) => {
  const navigate = useNavigate();
  const { wishlists, toggleWishlist } = useWishlist();

  const isInWishlist = wishlists[0]?.products.some(
    (item) => item.productId === productId
  );

  return (
    <div
      className={`relative ${
        showWishlist ? "rounded-xl" : "rounded-3xl"
      } duration-200 bg-white`}
    >
      <div
        onClick={() => navigate(`/products/${slug}`)}
        className={`relative cursor-pointer w-full aspect-square overflow-hidden ${
          showWishlist ? "rounded-xl" : "rounded-3xl"
        } mb-3`}
      >
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#aaaaaa] bg-opacity-15 rounded-xl z-0"></div>

        {showArrow && (
          <>
            {!bestSellingProduct && (
              <img
                className="absolute bottom-5 right-5"
                src={arrow_up}
                alt="arrow-up"
              />
            )}
          </>
        )}

        {showWishlist ? (
          <>
            {isInWishlist ? (
              <Favorite
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(productId);
                }}
                className="absolute top-3 right-3 cursor-pointer text-red-500"
              />
            ) : (
              <FavoriteBorderIcon
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(productId);
                }}
                className="absolute top-3 right-3 cursor-pointer text-gray-500"
              />
            )}
          </>
        ) : null}
      </div>

      {showArrow && (
        <>
          {bestSellingProduct && (
            <img
              onClick={() => navigate(`/products/${productId}`)}
              className="absolute bottom-10 right-3 cursor-pointer"
              src={arrow_up}
              alt="up-arrow"
            />
          )}
        </>
      )}

      <p
        onClick={() => navigate(`/products/${productId}`)}
        className="text-gray-800 w-fit text-xl m-0 line-clamp-1 cursor-pointer"
      >
        {productName}
      </p>
      {productOldPrice && (
        <p className="text-gray-300 line-through text-sm mt-2">
          $ {productOldPrice}
        </p>
      )}
      <p
        className={`text-[#018D43] text-xl ${
          showWishlist ? "!font-semibold" : "!font-[500]"
        } mt-0 ${!productOldPrice && "mt-2"}`}
      >
        $ {productNewPrice}
      </p>

      {isSale && (
        <div className="absolute top-3 left-3 bg-orange-500 text-white h-12 w-12 rounded-full flex items-center justify-center">
          <span className="text-xs">Sale !</span>
        </div>
      )}
    </div>
  );
};

export default Product;
