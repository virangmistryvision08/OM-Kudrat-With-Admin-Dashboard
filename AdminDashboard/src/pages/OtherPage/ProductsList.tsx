import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Modal } from "../../components/ui/modal";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import FileInput from "../../components/form/input/FileInput";
import Alert from "../../components/ui/alert/Alert";
import cookie from "js-cookie";
import { PaginationItem } from "@mui/material";

interface Product {
  id: string;
  productImage: string;
  productName: string;
  productNewPrice: number | string;
  languageName: string;
  categoryName: string;
  languageId?: string;
  categoryId?: string;
  slug: string;
}

const ProductsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null>(null);
  const [limit, setLimit] = useState(5);
  const [token, setToken] = useState(
    cookie.get(`${import.meta.env.VITE_COOKIE_TOKEN_NAME}`)
  );

  // === Form states ===
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    language: "",
    category: "",
    file: null as File | null,
    existingImage: "",
    slug: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const openEditModal = async (product: Product) => {
    setIsEditMode(true);
    setEditProductId(product.id);

    await Promise.all([get_all_languages(), get_all_categories()]);

    setIsModalOpen(true);

    setFormData({
      name: product.productName,
      price: product.productNewPrice.toString().replace("$", "").trim(),
      language: product.languageId || "",
      category: product.categoryId || "",
      file: null,
      existingImage: product.productImage,
      slug: product.slug,
    });
  };

  const openDeleteModal = (id: string) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    else {
      axios
        .delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/product/delete-product/${productToDelete}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
          get_all_products(currentPage, limit);
          setAlert({
            variant: "success",
            title: "Success!",
            message: "Product deleted successfully.",
          });
        })
        .catch((error) => {
          setDeleteModalOpen(false);
          setAlert({
            variant: "error",
            title: "Error!",
            message: error.response
              ? error.response.data.message
              : error.message,
          });
        });
    }
  };

  // Fetch languages
  const get_all_languages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/language/get-all-languages`
      );
      if (res.data?.data) {
        const formatted = res.data.data.map((lang: any) => ({
          value: lang._id,
          label: lang.languageName,
        }));
        setLanguageOptions(formatted);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  // Fetch categories
  const get_all_categories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/category/get-all-categories`
      );
      if (res.data?.data) {
        const formatted = res.data.data.map((cat: any) => ({
          value: cat._id,
          label: cat.categoryName,
        }));
        setCategoryOptions(formatted);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  useEffect(() => {
    get_all_products(currentPage, limit);
    get_all_languages();
    get_all_categories();
  }, [currentPage, limit]);

  const get_all_products = (currentPage: number, limit: number) => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage.toString());
    queryParams.append("productLimit", limit.toString());

    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/product/get-all-products?${queryParams.toString()}`
      )
      .then((res) => {
        const formattedData: Product[] = res.data.data.map((item: any) => ({
          id: item._id,
          productImage: item.productImage,
          productName: item.productName || "Untitled",
          productNewPrice: item.productNewPrice
            ? `$ ${item.productNewPrice}`
            : "N/A",
          languageName:
            item.language?.languageName || item.languageName || "N/A",
          categoryName:
            item.category?.categoryName || item.categoryName || "Uncategorized",
          languageId: item.languageId || "",
          categoryId: item.categoryId || "",
          slug: item.slug,
        }));

        if (formattedData.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
          get_all_products(currentPage - 1, limit);
          return;
        }

        setProducts(formattedData);
        setTotalProducts(res.data.pagination.totalProducts);
        setCurrentPage(res.data.pagination.currentPage);
        setTotalPages(res.data.pagination.totalPages);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handlePageChange = (_: any, value: number) => {
    setCurrentPage(value);
    get_all_products(value, limit);
  };

  const goToFirstPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1);
      get_all_products(1, limit);
    }
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(totalPages);
      get_all_products(totalPages, limit);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    console.log(formData, "formData");

    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.slug.trim()) newErrors.slug = "Product slug is required.";
    if (!formData.price) newErrors.price = "Product price is required.";
    if (!formData.language) newErrors.language = "Please select a language.";
    if (!formData.category) newErrors.category = "Please select a category.";

    if (!isEditMode && !formData.file)
      newErrors.file = "Please upload a product image.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const uploadData = new FormData();
    uploadData.append("productName", formData.name);
    uploadData.append("slug", formData.slug);
    uploadData.append("productNewPrice", formData.price);
    uploadData.append("language", formData.language);
    uploadData.append("category", formData.category);

    if (formData.file) {
      uploadData.append("productImage", formData.file);
    }

    try {
      if (isEditMode && editProductId) {
        await axios.patch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/product/update-product/${editProductId}`,
          uploadData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAlert({
          variant: "info",
          title: "Updated!",
          message: "Product updated successfully.",
        });
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/product/create-product`,
          uploadData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAlert({
          variant: "success",
          title: "Added!",
          message: "Product added successfully.",
        });
      }

      setIsModalOpen(false);
      setFormData({
        name: "",
        price: "",
        language: "",
        category: "",
        file: null,
        existingImage: "",
        slug: "",
      });
      get_all_products(currentPage, limit);
    } catch (err) {
      setIsModalOpen(false);
      console.error(err);
      setAlert({
        variant: "error",
        title: "Error!",
        message: err.response ? err.response.data.message : err.message,
      });
    }
  };

  const changeProduct = (e: number) => {
    setLimit(+e.target.value);
    get_all_products(currentPage, limit);
  };

  return (
    <div>
      <PageMeta
        title="Language List | TailAdmin - Next.js Admin Dashboard Template"
        description="Manage all Languages in the TailAdmin dashboard."
      />
      <PageBreadcrumb pageTitle="Products List" />

      {/* Show Alert on top */}
      {alert && (
        <div className="mb-5 fixed top-4 right-4 z-999999">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border !p-7 border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="flex justify-end items-center mb-7">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 px-4 py-2 text-white flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Add Product
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-200 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Product Image
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Language
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="w-12 h-12 overflow-hidden rounded-lg border">
                          <img
                            width={48}
                            height={48}
                            src={product.productImage}
                            alt={product.productName}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-800 font-medium text-start dark:text-white/90">
                        {product.productName}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product.productNewPrice}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product.languageName}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {product.categoryName}
                      </TableCell>
                      <TableCell className="px-6 py-4 text-left flex justify-center items-center gap-3 whitespace-nowrap">
                        <button
                          onClick={() => {
                            openEditModal(product);
                          }}
                          className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 h-10 w-10 text-white"
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          onClick={() => openDeleteModal(product.id)}
                          className="rounded bg-red-500 hover:bg-red-600 transition-colors duration-200 h-10 w-10 text-white"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell className="text-center py-6 text-gray-500">
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 gap-7">
          <div className="flex items-center justify-end gap-2 dark:text-white/90">
            Rows Per Page
            <select
              className="border"
              defaultValue={5}
              onChange={changeProduct}
              name="productLimit"
              id=""
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>{" "}
          </div>

          <div className="dark:text-white/90">
            {currentPage} - {totalPages} of {totalPages}
          </div>

          <div className="flex items-center">
            <button
              disabled={currentPage === 1}
              onClick={goToFirstPage}
              className={`px-4 py-2 rounded-full hover:bg-gray-100 dark:!text-gray-200 dark:hover:bg-gray-700 ${
                currentPage === 1 &&
                "text-gray-400 hover:bg-white dark:hover:bg-black"
              }`}
            >
              <i className="fa-solid fa-angles-left"></i>
            </button>

            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                shape="rounded"
                onChange={handlePageChange}
                siblingCount={0}
                boundaryCount={0}
                renderItem={(item) => {
                  if (
                    item.type === "page" ||
                    item.type === "start-ellipsis" ||
                    item.type === "end-ellipsis"
                  ) {
                    return null;
                  }

                  return (
                    <PaginationItem
                    className="dark:!text-white/90"
                      {...item}
                      sx={{
                        "&.MuiPaginationItem-root": {
                          borderRadius: "50%",
                          width: 36,
                          height: 36,
                        },
                      }}
                    />
                  );
                }}
              />
            </Stack>

            <button
              disabled={currentPage === totalPages}
              onClick={goToLastPage}
              className={`px-4 py-2 rounded-full hover:bg-gray-100 dark:!text-gray-200 dark:hover:bg-gray-700 ${
                currentPage === totalPages &&
                "text-gray-400 hover:bg-white dark:hover:bg-black"
              }`}
            >
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Add or Update Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({
            name: "",
            price: "",
            language: "",
            category: "",
            file: null,
            existingImage: "",
            slug: "",
          });
          setIsEditMode(false);
          setErrors({});
        }}
      >
        <div>
          <h3 className="text-lg font-bold dark:!text-gray-400">
            {isEditMode ? "Edit Product" : "Add Product"}
          </h3>

          <form className="space-y-4 mt-5" onSubmit={handleAddProduct}>
            <div>
              <Label>Product Name</Label>
              <input
                type="text"
                value={formData.name}
                placeholder="Enter product name"
                onChange={(e) => handleChange("name", e.target.value)}
                className="mb-1 w-full border p-2 rounded dark:placeholder:!text-white dark:!text-white"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <Label>Product Slug</Label>
              <input
                type="text"
                value={formData.slug}
                placeholder="eg. :- enter-product-name"
                onChange={(e) => handleChange("slug", e.target.value)}
                className="mb-1 w-full border p-2 rounded dark:placeholder:!text-white dark:!text-white"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug}</p>
              )}
            </div>

            <div>
              <Label>Product Price</Label>
              <input
                type="number"
                value={formData.price}
                placeholder="Enter Product Price"
                onChange={(e) => handleChange("price", e.target.value)}
                className="mb-1 w-full border p-2 rounded dark:placeholder:!text-white dark:!text-white"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div>
              <Label>Select Language</Label>
              <Select
                options={languageOptions}
                value={formData.language}
                onChange={(value) => handleChange("language", value)}
                placeholder="-- Select Language --"
              />
              {errors.language && (
                <p className="text-sm text-red-500">{errors.language}</p>
              )}
            </div>

            <div>
              <Label>Select Category</Label>
              <Select
                options={categoryOptions}
                value={formData.category}
                onChange={(value) => handleChange("category", value)}
                placeholder="-- Select Category --"
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div>
              <Label>Upload file</Label>
              <FileInput
                onChange={(event: any) => {
                  const file = event.target?.files?.[0];
                  handleChange("file", file || null);
                }}
              />

              {(formData.file || formData.existingImage) && (
                <div className="mt-3 flex items-center gap-4 border p-3 rounded bg-gray-50 dark:bg-white/5">
                  <img
                    src={
                      formData.file
                        ? URL.createObjectURL(formData.file)
                        : formData.existingImage
                    }
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded border"
                  />
                  <div className="flex flex-col text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {formData.file
                        ? formData.file.name
                        : products.find((p) => p.id === editProductId)
                            ?.productName}
                    </span>
                  </div>
                </div>
              )}

              {errors.file && (
                <p className="text-sm text-red-500">{errors.file}</p>
              )}
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="submit"
                className="rounded bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white transition-colors duration-200"
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="text-start">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-300">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteProduct}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsList;
