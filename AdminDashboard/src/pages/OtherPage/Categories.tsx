import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table/index";
import { format } from "date-fns";
import { Modal } from "../../components/ui/modal";
import Alert from "../../components/ui/alert/Alert";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

interface Category {
  id: string;
  categoryName: string;
  createdAt: string;
}

type ModalType = "edit" | "delete" | "add" | null;

const CategoriesList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [categoryNameInput, setCategoryNameInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/category/get-all-categories`)
      .then((res) => {
        const formattedData: Category[] = res.data.data.map((item: any) => ({
          id: item._id,
          categoryName: item.categoryName || "Uncategorized",
          createdAt: item.createdAt,
        }));
        setCategories(formattedData);
      })
      .catch((err) => console.error(err));
  };

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setCategoryNameInput(category.categoryName);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedCategory(null);
    setCategoryNameInput("");
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleAddCategory = () => {
    const trimmedName = categoryNameInput.trim();
    if (!trimmedName) {
      setInputError("Category Name is Required!");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/category/create-category`, {
        categoryName: trimmedName,
      })
      .then((res) => {
        setIsModalOpen(false);
        setCategoryNameInput("");
        setInputError(null);
        fetchCategories();
        showAlert(res.data.message, "success");
      })
      .catch((error) => {
        setIsModalOpen(false);
        showAlert(
          error.response ? error.response.data.message : error.message,
          "error"
        );
      });
  };

  const handleUpdateCategory = () => {
    if (!selectedCategory) return;

    const trimmedName = categoryNameInput.trim();
    if (!trimmedName) {
      setInputError("Enter Category Name To Update!");
      return;
    }

    axios
      .patch(
        `${import.meta.env.VITE_BACKEND_URL}/category/update-category/${
          selectedCategory.id
        }`,
        { categoryName: trimmedName }
      )
      .then((res) => {
        setIsModalOpen(false);
        setSelectedCategory(null);
        setCategoryNameInput("");
        setInputError(null);
        fetchCategories();
        showAlert(res.data.message, "success");
      })
      .catch((error) => {
        setIsModalOpen(false);
        showAlert(
          error.response ? error.response.data.message : error.message,
          "error"
        );
      });
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/category/delete-category/${
          selectedCategory.id
        }`
      )
      .then((res) => {
        setIsModalOpen(false);
        setSelectedCategory(null);
        fetchCategories();
        showAlert(res.data.message, "success");
      })
      .catch((error) => {
        setIsModalOpen(false);
        showAlert(
          error.response ? error.response.data.message : error.message,
          "error"
        );
      });
  };

  return (
    <div>
      <PageMeta
        title="Category List | TailAdmin - Next.js Admin Dashboard Template"
        description="Manage all categories in the TailAdmin dashboard."
      />

      <PageBreadcrumb pageTitle="Categories" />

      <div className="rounded-2xl border border-gray-200 bg-white !px-7 !py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        
        <div className="fixed top-4 right-4 z-999999">
          {alert.show && (
            <Alert
              variant={alert.type === "success" ? "success" : "error"}
              title={alert.type === "success" ? "Success" : "Error"}
              message={alert.message}
              className="w-auto"
            />
          )}
        </div>

        {/* Header */}
        <div className="flex justify-end items-center mb-7">
          <button
            onClick={openAddModal}
            className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 px-4 py-2 text-white flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Add Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="min-w-[700px]">
            <Table>
              <TableHeader className="border-b border-gray-200 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Category Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Created At
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-center text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      {category.categoryName}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-500 dark:text-gray-400 text-left whitespace-nowrap">
                      {format(new Date(category.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-left flex justify-center items-center gap-3 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(category)}
                        className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 h-10 w-10 text-white"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => openDeleteModal(category)}
                        className="rounded bg-red-500 hover:bg-red-600 transition-colors duration-200 h-10 w-10 text-white"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setInputError(null);
        }}
      >
        {modalType === "add" && (
          <div>
            <h3 className="text-lg font-bold">Add Category</h3>
            <input
              type="text"
              value={categoryNameInput}
              placeholder="Enter Category"
              onChange={(e) => {
                const value = e.target.value;
                setCategoryNameInput(value);

                if (!value.trim()) {
                  setInputError("Enter Category Name To Update!");
                } else {
                  setInputError(null);
                }
              }}
              className="mt-2 w-full border p-2"
            />
            {inputError && (
              <p className="mt-1 text-sm text-red-500">{inputError}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleAddCategory}
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {modalType === "edit" && (
          <div>
            <h3 className="text-lg font-bold">Edit Category</h3>
            <input
              type="text"
              value={categoryNameInput}
              placeholder="Enter Category"
              onChange={(e) => {
                const value = e.target.value;
                setCategoryNameInput(value);

                if (!value.trim()) {
                  setInputError("Category Name is Required!");
                } else {
                  setInputError(null);
                }
              }}
              className="mt-2 w-full border p-2"
            />
            {inputError && (
              <p className="mt-1 text-sm text-red-500">{inputError}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleUpdateCategory}
                className="mt-4 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 px-4 py-2 text-white"
              >
                Update
              </button>
            </div>
          </div>
        )}

        {modalType === "delete" && (
          <div>
            <h3 className="text-lg font-bold">Delete Category</h3>
            <p>Are you sure you want to delete this category?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 mr-2 rounded bg-gray-400 px-4 py-2 hover:bg-gray-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="mt-4 rounded bg-red-500 hover:bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CategoriesList;
