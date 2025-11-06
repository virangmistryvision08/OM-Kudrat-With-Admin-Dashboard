import React, { useEffect, useState } from "react";
import star from "../../../public/homeImage/Star.svg";
import arrow_right from "../../../public/bestSellingProducts/arrow-right.svg";
import Product from "../Product";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BestSellingProducts = () => {
  const [bestSellingProducts, setbestSellingProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/get-all-product`).then((res) => {
      const all = res.data.data.filter((item) => item.productType === "bestSellingProduct")
      setbestSellingProducts([...all]);
    }).catch((error) => {
      console.log(error, 'error');
    })
  }

  return (
    <div className="w-full pb-24">
      <div className="w-[90%] lg:w-[80%] mx-auto font-[Poppins]">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1 border border-gray-400 bg-white rounded-full text-sm mb-4">
            <img src={star} alt="star" className="w-4 h-4" />
            Newly Mode
          </span>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-[BelfastGrotesk]">
              Our Best Selling Products
            </h2>
            <div className="flex flex-wrap gap-0">
              <button onClick={() => navigate("/products")} className="px-4 py-2 rounded-full text-sm border flex gap-2">
                View All Products <img src={arrow_right} alt="arrow_right" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10">
          {bestSellingProducts.map((product) => (
            <Product key={product._id} productId={product._id} productImage={product.productImage} productName={product.productName} productNewPrice={product.productNewPrice} bestSellingProduct={true} showWishlist={true} showArrow={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
