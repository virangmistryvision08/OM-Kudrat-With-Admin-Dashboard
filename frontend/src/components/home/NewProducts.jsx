import React, { useEffect, useState } from "react";
import star from "../../../public/homeImage/Star.svg";
import axios from "axios";
import { toast } from "react-toastify";
import Product from "../Product";

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [allCategory, setAllCategory] = useState(true);
  const [category, setCategory] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  // Filter logic
  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((p) => p.categoryName === activeTab);

  useEffect(() => {
    get_all_products();
  }, []);

  const get_all_products = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/get-all-product`)
      .then((response) => {
        const newProducts = response.data.data.filter((item) => item.productType === "newProducts");
        setProducts([...newProducts]);

        const productCategory = response.data.data.filter((item) => item.categoryName);
        setCategory([...new Set(["All", ...productCategory.map((item) => item.categoryName === "Spices" && "Spices" || item.categoryName === "Pulses" && "Pulses")])]);
      })
      .catch((error) => {
        toast.error(error.response ? error.response.data.message : error.message);
      });
  }

  return (
    <section className="w-full pb-24 bg-white font-[Poppins]">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1 border border-gray-400 bg-white rounded-full text-sm mb-4">
            <img src={star} alt="star" className="w-4 h-4" />
            Newly Mode
          </span>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-[BelfastGrotesk]">
              Our New Products
            </h2>
            <div className="flex flex-wrap">
              {category.filter((item) => item).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-5 py-2 text-sm lg:text-lg rounded-full transition-all duration-200 ${activeTab === category
                      ? "bg-[#018D43] text-white"
                      : "border border-gray-400 text-gray-700"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <Product
              key={product._id}
              productId={product._id}
              productImage={product.productImage}
              productName={product.productName}
              productOldPrice={product.productOldPrice}
              productNewPrice={product.productNewPrice}
              isSale={false}
              bestSellingProduct={false}
              showWishlist={true}
              showArrow={true}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
