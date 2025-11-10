import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TuneIcon from "@mui/icons-material/Tune";
import Drawer from "@mui/material/Drawer";
import axios from "axios";
import Footer from "./Footer";
import search from "../../public/products/search-normal.svg";
import noProductFound from "../../public/products/hand-drawn-no-data-illustration_23-2150696443.jpg";
import product_background from "../../public/products/products-background.jpg";
import Product from "./Product";

function valuetext(value) {
  return `${value}°C`;
}

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedLanguageIds, setSelectedLanguageIds] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const [priceRange, setPriceRange] = useState([0, 60]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [limit, setLimit] = useState(9);

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
    get_all_products(
      selectedProductIds,
      selectedLanguageIds,
      sortOption,
      searchProductName,
      newValue,
      currentPage
    );
  };

  useEffect(() => {
    get_all_filtered_products();
    get_all_products(
      [],
      [],
      sortOption,
      searchProductName,
      priceRange,
      currentPage
    );
  }, []);

  const get_all_filtered_products = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/product/get-filtered-products`)
      .then((res) => {
        setFilteredProducts([...res.data.data]);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const get_all_products = (
    productIds = [],
    languageIds = [],
    sortOption = "",
    searchProductName = "",
    priceRange = [],
    currentPage
  ) => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", currentPage);
    queryParams.append("productLimit", limit);

    if (productIds.length > 0) {
      queryParams.append("productIds", productIds.join(","));
    }

    if (languageIds.length > 0) {
      queryParams.append("languageId", languageIds.join(","));
    }

    if (searchProductName) {
      queryParams.append("productName", searchProductName);
    }

    if (priceRange) {
      queryParams.append("productOldPrice", priceRange[0]);
      queryParams.append("productNewPrice", priceRange[1]);
    }

    switch (sortOption) {
      case "price-asc":
        queryParams.append("productPriceAss", true);
        break;
      case "price-desc":
        queryParams.append("productPriceDiss", true);
        break;
      case "name-asc":
        queryParams.append("productNameAss", true);
        break;
      case "name-desc":
        queryParams.append("productNameDiss", true);
        break;
      default:
        break;
    }

    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product/get-all-products?${queryParams.toString()}`
      )
      .then((res) => {
        setAllProducts(res.data.data);
        setCurrentPage(res.data.pagination.currentPage);
        setTotalPages(res.data.pagination.totalPages);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const toggleProductId = (productId) => {
    setSelectedProductIds((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      get_all_products(
        updated,
        selectedLanguageIds,
        sortOption,
        searchProductName,
        priceRange,
        currentPage
      );
      return updated;
    });
  };

  const toggleLanguageId = (languageId) => {
    setSelectedLanguageIds((prev) => {
      const updated = prev.includes(languageId)
        ? prev.filter((id) => id !== languageId)
        : [...prev, languageId];

      get_all_products(
        selectedProductIds,
        updated,
        sortOption,
        searchProductName,
        priceRange,
        currentPage
      );
      return updated;
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    get_all_products(
      selectedProductIds,
      selectedLanguageIds,
      sortOption,
      searchProductName,
      priceRange,
      value
    );
  };

  const goToFirstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
      get_all_products(
        selectedProductIds,
        selectedLanguageIds,
        sortOption,
        searchProductName,
        priceRange,
        1
      );
    }
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
      get_all_products(
        selectedProductIds,
        selectedLanguageIds,
        sortOption,
        searchProductName,
        priceRange,
        totalPages
      );
    }
  };

  const renderFilterContent = (product) => (
    <form className="w-full p-5">
      <div className="flex items-center gap-3">
        <span className="text-[#018D43] font-[BelfastGrotesk] text-xl">
          Search
        </span>
        <hr className="!border-[0.01rem] border-[#d9d9d9] w-[100%]" />
      </div>

      <div className="flex items-center mt-4">
        <input
          type="text"
          name="search"
          value={searchProductName}
          onChange={(e) => {
            const value = e.target.value;
            setSearchProductName(value);
            get_all_products(
              selectedProductIds,
              selectedLanguageIds,
              sortOption,
              value,
              priceRange,
              currentPage
            );
          }}
          className="bg-gray-200 w-full outline-[#018D43] text-gray-700 placeholder:text-gray-700 py-3 rounded-full ps-7 lg:ps-5 lg:placeholder:text-xs"
          placeholder="Search Products"
        />
        <button className="border border-gray-400 rounded-full p-3">
          <img src={search} alt="Search Icon" />
        </button>
      </div>

      <div className="flex items-center gap-3 mt-10 mb-5">
        <span className="text-[#018D43] font-[BelfastGrotesk] text-xl">
          Categories
        </span>
        <hr className="!border-[0.01rem] border-[#d9d9d9] w-[100%]" />
      </div>

      {product.categories.map((item) => (
        <Accordion
          key={item.categoryName}
          defaultExpanded={item.categoryName === "Spices"}
          className="!shadow-none mt-2 before:!hidden !border-b pb-3 !border-gray-200"
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon className="!border-2 !border-gray-500 rounded-md" />
            }
          >
            <Typography>{item.categoryName}</Typography>
          </AccordionSummary>
          {item.products.map((prod) => (
            <div
              key={prod.productId}
              className="flex items-center justify-between pt-3 ps-5"
            >
              <div className="flex items-center gap-3">
                <input
                  onChange={() => toggleProductId(prod.productId)}
                  checked={selectedProductIds.includes(prod.productId)}
                  className="h-4 w-4 cursor-pointer"
                  type="checkbox"
                  id={prod.productName}
                />
                <label
                  htmlFor={prod.productName}
                  className="text-gray-500 text-sm cursor-pointer"
                >
                  {prod.productName}
                </label>
              </div>
            </div>
          ))}
        </Accordion>
      ))}

      <div className="flex items-center gap-3 mt-10">
        <span className="text-[#018D43] font-[BelfastGrotesk] text-xl">
          Language
        </span>
        <hr className="!border-[0.01rem] border-[#d9d9d9] w-[100%]" />
      </div>

      <div className="mt-3">
        {product.languages.map((lang) => (
          <div
            key={lang.languageId}
            className="flex items-center justify-between pt-3 ps-5"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedLanguageIds.includes(lang.languageId)}
                onChange={() => toggleLanguageId(lang.languageId)}
                className="h-4 w-4 cursor-pointer"
                id={lang.languageId}
              />
              <label
                htmlFor={lang.languageId}
                className="text-gray-500 text-sm cursor-pointer"
              >
                {lang.languageName}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-10">
        <span className="text-[#018D43] font-[BelfastGrotesk] text-xl whitespace-nowrap">
          Filter By Price
        </span>
        <hr className="!border-[0.01rem] w-[100%] border-[#d9d9d9]" />
      </div>

      <Box className="w-full">
        <Slider
          className="mt-5"
          value={priceRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          sx={{
            color: "transparent",
            height: 6,
            "& .MuiSlider-track": { backgroundColor: "#16a34a" },
            "& .MuiSlider-rail": { backgroundColor: "#e5e7eb", opacity: 1 },
            "& .MuiSlider-thumb": { backgroundColor: "#16a34a" },
          }}
        />
        <Typography
          variant="body2"
          sx={{ marginTop: 1, textAlign: "center", color: "#374151" }}
          className="flex justify-between items-center"
        >
          <span className="text-xl font-[BelfastGrotesk] font-semibold text-gray-600">
            ${priceRange[0]}
          </span>
          <span className="text-xl font-[BelfastGrotesk] font-semibold text-gray-600">
            ${priceRange[1]}
          </span>
        </Typography>
      </Box>
    </form>
  );

  return (
    <>
      <section className="w-full mt-24 pb-24 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <section
            className="relative bg-white min-h-72 rounded-2xl"
            style={{
              backgroundImage: `url("${product_background}")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">Products</h1>
              <p className="text-xs mt-2">Home > Products</p>
            </div>
          </section>

          <div className="flex flex-col lg:flex-row justify-between gap-5 mb-8 mt-8 lg:mt-16">
            {/* Filter Part */}
            {filteredProducts.map((product) => (
              <React.Fragment key={product._id}>
                <div
                  className="lg:hidden flex items-center gap-2 border border-gray-400 w-fit px-5 py-2 rounded-md cursor-pointer"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <TuneIcon />
                  <span>Filter</span>
                </div>

                {/* Desktop Sidebar */}
                <div className="hidden lg:block lg:w-[25%]">
                  {renderFilterContent(product)}
                </div>

                {/* Mobile Drawer */}
                <Drawer
                  className="lg:hidden"
                  anchor="right"
                  open={mobileFilterOpen}
                  onClose={() => setMobileFilterOpen(false)}
                  PaperProps={{ sx: { width: "80%", maxWidth: 400 } }}
                >
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-[BelfastGroteskBold] font-bold text-[#018D43]">
                      Filters
                    </h2>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="text-gray-500"
                    >
                      ✕
                    </button>
                  </div>
                  {renderFilterContent(product)}
                </Drawer>
              </React.Fragment>
            ))}

            {/* Product List */}
            <div className="w-full lg:w-[75%]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
                <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-[BelfastGrotesk] text-center sm:text-left">
                  Featured Products
                </h2>
                <div className="flex items-center flex-wrap justify-center sm:justify-end gap-2 sm:gap-3">
                  <p className="text-gray-500 text-sm sm:text-base">
                    Sort By <span className="text-black font-semibold">:</span>
                  </p>
                  <div className="relative inline-block w-56">
                    <select
                      dir="ltr"
                      value={sortOption}
                      onChange={(e) => {
                        const selected = e.target.value;
                        setSortOption(selected);
                        get_all_products(
                          selectedProductIds,
                          selectedLanguageIds,
                          selected,
                          searchProductName,
                          priceRange,
                          currentPage
                        );
                      }}
                      className="appearance-none w-auto text-center flex items-center justify-center rounded-md pe-10 ms-2 bg-white outline-none border-none py-2 px-3"
                    >
                      <option className="bg-gray-100 text-gray-500" value="">
                        Default
                      </option>
                      <option
                        className="bg-gray-100 text-gray-500"
                        value="price-asc"
                      >
                        Price (Low to High)
                      </option>
                      <option
                        className="bg-gray-100 text-gray-500"
                        value="price-desc"
                      >
                        Price (High to Low)
                      </option>
                      <option
                        className="bg-gray-100 text-gray-500"
                        value="name-asc"
                      >
                        A - Z
                      </option>
                      <option
                        className="bg-gray-100 text-gray-500"
                        value="name-desc"
                      >
                        Z - A
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
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
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {allProducts.length === 0 ? (
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
                  allProducts.map((product) => (
                    <Product
                      productId={product._id}
                      productImage={product.productImage}
                      productName={product.productName}
                      productOldPrice={product.productOldPrice}
                      productNewPrice={product.productNewPrice}
                      isSale={product.isSale}
                      bestSellingProduct={false}
                      showWishlist={true}
                      showArrow={true}
                      slug={product.slug}
                    />
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

export default Products;
