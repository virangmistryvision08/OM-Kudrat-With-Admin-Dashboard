import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";
import noProductFound from "../../public/products/hand-drawn-no-data-illustration_23-2150696443.jpg";
import DOMPurify from "dompurify";
import Footer from "./Footer";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import left_arrow from "../../public/blog/left-arrow.svg";
import right_arrow from "../../public/blog/right-arrow.svg";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogs, setblogs] = useState([]);
  const [bestSellingProducts, setbestSellingProducts] = useState([]);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getLabel = (value) => {
    switch (value) {
      case "name-asc":
        return "A - Z";
      case "name-desc":
        return "Z - A";
      default:
        return "Default";
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    get_all_blogs(value, currentPage);
    setDropdownOpen(false);
  };

  useEffect(() => {
    get_all_blogs(sortOption, currentPage);
    get_three_latest_blogs();
    getAllProducts();
  }, []);

  const get_all_blogs = (sortOption = "", currentPage) => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", currentPage);

    switch (sortOption) {
      case "name-asc":
        queryParams.append("blogNameAss", true);
        break;
      case "name-desc":
        queryParams.append("blogNameDiss", true);
        break;
      default:
        break;
    }

    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/blog/get-all-blogs?${queryParams.toString()}`
      )
      .then((res) => {
        setAllBlogs(res.data.data);
        setCurrentPage(res.data.pagination.currentPage);
        setTotalPages(res.data.pagination.totalPages);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const get_three_latest_blogs = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/blog/top-three-latest-blogs`)
      .then((res) => {
        setblogs([...res.data.data]);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const getAllProducts = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/get-all-product`)
      .then((res) => {
        const all = res.data.data.filter(
          (item) => item.productType === "bestSellingProduct"
        );
        setbestSellingProducts([...all]);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    get_all_blogs(sortOption, value);
  };

  const goToFirstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
      get_all_blogs(sortOption, 1);
    }
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
      get_all_blogs(sortOption, totalPages);
    }
  };

  return (
    <>
      <section className="w-full mt-24 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <section className="relative bg-white min-h-72 rounded-2xl blog-bg">
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">Blogs</h1>
              <p className="text-xs mt-2">Home > Blog</p>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row justify-between gap-5 my-8 lg:my-28">
            <div className="w-full lg:w-[30%] pr-5">
              <div className="flex items-center gap-3 mt-0 mb-5">
                <span className="text-[#018D43] font-[BelfastGrotesk] whitespace-nowrap text-xl">
                  Recent Articles
                </span>
                <hr className="!border-[0.01rem] border-[#d9d9d9] w-[100%]" />
              </div>

              <div className="my-8">
                {blogs.map((blog) => {
                  return (
                    <div className="flex gap-5 mt-5">
                      <img
                        className="h-20 w-20 object-cover rounded-xl"
                        src={blog.blogImage}
                        alt={blog.blogName}
                      />
                      <div className="">
                        <h1>{blog.blogName}</h1>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(blog.htmlContent),
                          }}
                          className="line-clamp-2 mt-2 lg:mt-1 xl:mt-3 !font-[300] text-xs text-gray-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 mt-10">
                <span className="text-[#018D43] font-[BelfastGrotesk] text-xl">
                  Tags
                </span>
                <hr className="!border-[0.01rem] border-[#d9d9d9] w-[100%]" />
              </div>

              <div className="flex flex-col gap-3 mt-7 ml-6 !font-[300]">
                <div>Flavour Spices</div>
                <div>Garam</div>
                <div>Masala Powder</div>
                <div>Pulses</div>
                <div>Pulses Powder</div>
              </div>

              <div className="flex items-center gap-3 mt-10">
                <span className="text-[#018D43] font-[BelfastGrotesk] text-xl whitespace-nowrap">
                  Best Seller
                </span>
                <hr className="!border-[0.01rem] w-[100%] border-[#d9d9d9]" />
              </div>

              <div className="relative mt-8 w-full md:w-1/2 mx-auto lg:w-full">
                {/* Swiper */}
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={1}
                  speed={600}
                  loop={true}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  className="w-full h-full"
                >
                  {bestSellingProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                      <Product
                        key={product._id}
                        productId={product._id}
                        productImage={product.productImage}
                        productName={product.productName}
                        productNewPrice={product.productNewPrice}
                        bestSellingProduct={true}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="absolute bottom-0 lg:-bottom-5 xl:-bottom-3 right-0 flex items-center z-10">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="bg-white rounded-full"
                  >
                    <img src={left_arrow} alt="left_arrow" />
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="bg-white rounded-full"
                  >
                    <img src={right_arrow} alt="right_arrow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Blog List */}
            <div className="w-full lg:w-[75%] mt-5 lg:mt-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
                <h2 className="text-2xl xl:text-3xl font-[BelfastGrotesk] text-center sm:text-left">
                  Featured Blogs
                </h2>
                <div className="flex items-center flex-wrap justify-center sm:justify-end gap-2 sm:gap-3">
                  <p className="text-gray-500 text-sm sm:text-base">
                    Sort By <span className="text-black font-semibold">:</span>
                  </p>
                  {/* Custom Dropdown */}
                  <div className="relative inline-block w-56">
                    {/* Selected Value */}
                    <div
                      className="cursor-pointer w-full text-center flex items-center justify-between bg-white rounded-md py-2 px-3"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span>
                        {sortOption ? getLabel(sortOption) : "Default"}
                      </span>
                      <div className="bg-green-700 p-2 rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Options */}
                    {dropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                        <div
                          className="cursor-pointer py-2 px-3 hover:bg-gray-100"
                          onClick={() => handleSortChange("")}
                        >
                          Default
                        </div>
                        <div
                          className="cursor-pointer py-2 px-3 hover:bg-gray-100"
                          onClick={() => handleSortChange("name-asc")}
                        >
                          A - Z
                        </div>
                        <div
                          className="cursor-pointer py-2 px-3 hover:bg-gray-100"
                          onClick={() => handleSortChange("name-desc")}
                        >
                          Z - A
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {allBlogs.length === 0 ? (
                  <div className="min-h-96 min-w-96 text-center">
                    <img
                      className="object-cover mx-auto"
                      src={noProductFound}
                      alt="No Product Found"
                    />
                    <h1 className="text-3xl font-[Poppins]">
                      Filter Not Matched!
                    </h1>
                  </div>
                ) : (
                  allBlogs.map((blog) => (
                    <div className="flex flex-col justify-between gap-3 h-[420px]">
                      <img
                        className="h-[250px] xl:h-[200px] 2xl:h-[250px] object-cover rounded-2xl"
                        src={blog.blogImage}
                        alt={blog.blogName}
                      />
                      <h1 className="text-xl font-semibold">{blog.blogName}</h1>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(blog.htmlContent),
                        }}
                        className="line-clamp-2 text-gray-500 !font-[400]"
                      ></div>
                      <button
                        onClick={() => navigate(`/blog/${blog.slug}`)}
                        className="px-7 py-3 w-fit bg-[#018D43] text-white rounded-full"
                      >
                        Read More
                      </button>
                    </div>
                  ))
                )}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-start items-center mt-10 gap-3">
                  {currentPage > 1 && (
                    <button
                      onClick={goToFirstPage}
                      className="px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
                    >
                      First
                    </button>
                  )}

                  <Stack spacing={2}>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="success"
                      hidePrevButton={currentPage === 1}
                      hideNextButton={currentPage === totalPages}
                    />
                  </Stack>

                  {currentPage < totalPages && (
                    <button
                      onClick={goToLastPage}
                      className="px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-100"
                    >
                      Last
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blogs;
