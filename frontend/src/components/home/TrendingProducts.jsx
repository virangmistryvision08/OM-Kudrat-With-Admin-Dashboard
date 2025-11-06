import React, { useEffect, useState } from "react";
import star from "../../../public/homeImage/Star.svg";
import trending_product5 from "../../../public/trendingProducts/trending-product5.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TrendingProducts = () => {
  const [getTrendingProducts, setGetTrendingProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    get_four_trending_products();
  }, []);

  const get_four_trending_products = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product/get-top-four-trending-products`
      )
      .then((response) => {
        setGetTrendingProducts([...response.data.data]);
      })
      .catch((error) => {
        toast.error(
          error.response ? error.response.data.message : error.message
        );
      });
  };

  return (
    <div className="w-full pb-24">
      <div className="w-[90%] lg:w-[80%] mx-auto font-[Poppins] flex flex-col lg:flex-row justify-between gap-4">
        <div className="w-[100%] lg:w-[65%]">
          {/* Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1 border border-gray-400 bg-white rounded-full text-sm mb-2">
              <img src={star} alt="star" className="w-4 h-4" />
              Recently Add
            </span>
            <h2 className="text-2xl md:text-3xl font-[BelfastGrotesk]">
              Trending Products
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {getTrendingProducts.map((product) => {
              return (
                <div className="flex items-center gap-3 xl:gap-5">
                  <div
                    onClick={() => {
                      navigate(`/products/${product.productId}`);
                    }}
                    style={{
                      backgroundImage: `url("${product.productImage}")`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="relative cursor-pointer h-[100px] xl:!h-[150px] w-[100px] xl:!w-[150px] overflow-hidden flex justify-center items-center rounded-xl"
                  >
                    {/* <img className='h-[180px] w-[150px] rounded-xl border' src={product.productImage} alt={product.name} /> */}
                    <div className="absolute inset-0 bg-[#a8a8a8] bg-opacity-15 rounded-xl z-0"></div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p onClick={() => {
                        navigate(`/products/${product.productId}`)
                    }} className="font-semibold cursor-pointer m-0 text-sm xl:text-lg">
                      {product.productName}
                    </p>
                    <p className="m-0 line-through text-gray-400 text-[0.8rem]">
                      ${product.productOldPrice}
                    </p>
                    <p className="text-[#018D43] m-0 text-xl">
                      ${product.productNewPrice}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#018D43] text-white w-[100%] lg:w-[30%] p-4 rounded-xl text-center">
          <p className="text-center text-2xl lg:text-lg xl:text-xl font-[BelfastGrotesk] mb-3">
            Deal Of The Week
          </p>
          <img
            className="rounded-xl h-[280px] md:h-[350px] md:w-[400px] md:mx-auto lg:h-[200px] xl:h-[300px] 2xl:h-[350px] w-full object-cover"
            src={trending_product5}
            alt="Barberry"
          />
          <p className="mt-2 mb-0 text-xl">Barberry</p>
          <p className="line-through text-gray-300 m-0 mt-1 text-[0.8rem]">
            $34.60
          </p>
          <p>$24.60</p>
          <button className="px-4 py-3 rounded-full bg-white text-black">
            Discover Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;

// import React, { useEffect, useState } from 'react'
// import star from "../../../public/homeImage/Star.svg";
// import trending_product5 from "../../../public/trendingProducts/trending-product5.png";
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const TrendingProducts = () => {
//     const [getTrendingProducts, setGetTrendingProducts] = useState([]);

//     useEffect(() => {
//         get_four_trending_products();
//     }, []);

//     const get_four_trending_products = () => {
//         axios.get(`${import.meta.env.VITE_BACKEND_URL}/product/get-top-four-trending-products`)
//             .then(response => {
//                 setGetTrendingProducts([...response.data.data]);
//             })
//             .catch((error) => {
//                 toast.error(error.response ? error.response.data.message : error.message);
//             });
//     }

//     return (
//         <div className="w-full pb-24">
//             <div className="w-[90%] lg:w-[80%] mx-auto font-[Poppins] flex flex-col lg:flex-row justify-between gap-4">
//                 <div className='w-[100%] lg:w-[65%]'>
//                     {/* Header */}
//                     <div className="mb-8">
//                         <span className="inline-flex items-center gap-2 px-4 py-1 border border-gray-400 bg-white rounded-full text-sm mb-2">
//                             <img src={star} alt="star" className="w-4 h-4" />
//                             Recently Add
//                         </span>
//                         <h2 className="text-2xl md:text-3xl font-[BelfastGrotesk]">
//                             Trending Products
//                         </h2>
//                     </div>

//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
//                         {
//                             getTrendingProducts.map((product) => {
//                                 return (
//                                     <div className='flex items-center gap-3 xl:gap-5'>
//                                         <div style={{ backgroundImage: `url("${product.productImage}")`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className='relative h-[100px] xl:!h-[150px] w-[100px] xl:!w-[150px] overflow-hidden flex justify-center items-center rounded-xl'>
//                                             {/* <img className='h-[180px] w-[150px] rounded-xl border' src={product.productImage} alt={product.name} /> */}
//                                             <div className="absolute inset-0 bg-[#a8a8a8] bg-opacity-15 rounded-xl z-0"></div>
//                                         </div>
//                                         <div className='flex flex-col gap-1'>
//                                             <p className='font-semibold m-0 text-sm xl:text-lg'>{product.productName}</p>
//                                             <p className='m-0 line-through text-gray-400 text-[0.8rem]'>{product.productOldPrice}</p>
//                                             <p className='text-[#018D43] m-0'>{product.productNewPrice}</p>
//                                         </div>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//                 <div className='bg-[#018D43] text-white w-[100%] lg:w-[30%] p-4 rounded-xl text-center'>
//                     <p className='text-center text-2xl lg:text-lg xl:text-xl font-[BelfastGrotesk] mb-3'>Deal Of The Week</p>
//                     <img className='rounded-xl h-[280px] md:h-[350px] md:w-[400px] md:mx-auto lg:h-[200px] xl:h-[300px] 2xl:h-[350px] w-full object-cover' src={trending_product5} alt="Barberry" />
//                     <p className='mt-2 mb-0 text-xl'>Barberry</p>
//                     <p className='line-through text-gray-300 m-0 mt-1 text-[0.8rem]'>$34.60</p>
//                     <p>$24.60</p>
//                     <button className='px-4 py-3 rounded-full bg-white text-black'>Discover Now</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TrendingProducts