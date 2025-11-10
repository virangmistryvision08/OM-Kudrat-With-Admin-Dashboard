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
import cookie from "js-cookie";

interface Language {
  id: string;
  languageName: string;
  createdAt: string;
}

type ModalType = "edit" | "delete" | "add" | null;

const LanguagesList: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null
  );
  const [languageNameInput, setLanguageNameInput] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [token, setToken] = useState(
    cookie.get(`${import.meta.env.VITE_COOKIE_TOKEN_NAME}`)
  );

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
      .get(`${import.meta.env.VITE_BACKEND_URL}/language/get-all-languages`)
      .then((res) => {
        const formattedData: Language[] = res.data.data.map((item: any) => ({
          id: item._id,
          languageName: item.languageName || "Uncategorized",
          createdAt: item.createdAt,
        }));
        setLanguages(formattedData);
      })
      .catch((err) => console.error(err));
  };

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), 3000);
  };

  const openEditModal = (language: Language) => {
    setSelectedLanguage(language);
    setLanguageNameInput(language.languageName);
    setModalType("edit");
    setIsModalOpen(true);
  };

  const openDeleteModal = (language: Language) => {
    setSelectedLanguage(language);
    setModalType("delete");
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedLanguage(null);
    setLanguageNameInput("");
    setModalType("add");
    setIsModalOpen(true);
  };

  const handleAddLanguage = () => {
    const trimmedName = languageNameInput.trim();
    if (!trimmedName) {
      setInputError("Language Name is Required!");
      return;
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/language/create-language`,
        {
          languageName: trimmedName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setIsModalOpen(false);
        setLanguageNameInput("");
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

  const handleUpdateLanguage = () => {
    if (!selectedLanguage) return;

    const trimmedName = languageNameInput.trim();
    if (!trimmedName) {
      setInputError("Enter Language Name To Update!");
      return;
    }

    axios
      .patch(
        `${import.meta.env.VITE_BACKEND_URL}/language/update-language/${
          selectedLanguage.id
        }`,
        { languageName: trimmedName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setIsModalOpen(false);
        setSelectedLanguage(null);
        setLanguageNameInput("");
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

  const handleDeleteLanguage = () => {
    if (!setSelectedLanguage) return;

    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/language/delete-language/${
          selectedLanguage.id
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setIsModalOpen(false);
        setSelectedLanguage(null);
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
        title="Language List | TailAdmin - Next.js Admin Dashboard Template"
        description="Manage all Languages in the TailAdmin dashboard."
      />
      <PageBreadcrumb pageTitle="Languages" />

      <div className="rounded-2xl border border-gray-200 bg-white !px-7 !py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="fixed top-4 right-4 z-999999">
          {alert.show && (
            <Alert
              variant={alert.type === "success" ? "success" : "error"}
              title={alert.type === "success" ? "Success" : "Error"}
              message={alert.message}
              // className="w-auto"
            />
          )}
        </div>

        {/* Header */}
        <div className="flex justify-end items-center mb-7">
          <button
            onClick={openAddModal}
            className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 px-4 py-2 text-white flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Add Language
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="min-w-[700px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Language Name
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
                {languages.map((language) => (
                  <TableRow key={language.id}>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      {language.languageName}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-500 dark:text-gray-400 text-left whitespace-nowrap">
                      {format(new Date(language.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-left flex justify-center items-center gap-3 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(language)}
                        className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 h-10 w-10 text-white"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => openDeleteModal(language)}
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
            <h3 className="text-lg font-bold">Add Language</h3>
            <input
              type="text"
              value={languageNameInput}
              placeholder="Enter Language"
              onChange={(e) => {
                const value = e.target.value;
                setLanguageNameInput(value);

                if (!value.trim()) {
                  setInputError("Language Name is Required!");
                } else {
                  setInputError(null);
                }
              }}
              className="mt-2 w-full border p-2"
            />
            {inputError && (
              <p className="mt-1 text-sm text-red-500">{inputError}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddLanguage}
                className="rounded bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white transition-colors duration-200"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {modalType === "edit" && (
          <div>
            <h3 className="text-lg font-bold">Edit Language</h3>
            <input
              type="text"
              value={languageNameInput}
              placeholder="Enter Language"
              onChange={(e) => {
                const value = e.target.value;
                setLanguageNameInput(value);

                if (!value.trim()) {
                  setInputError("Enter Language Name To Update!");
                } else {
                  setInputError(null);
                }
              }}
              className="mt-2 w-full border p-2"
            />
            {inputError && (
              <p className="mt-1 text-sm text-red-500">{inputError}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleUpdateLanguage}
                className="mt-4 rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 px-4 py-2 text-white"
              >
                Update
              </button>
            </div>
          </div>
        )}

        {modalType === "delete" && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Delete Language</h3>
            <p>Are you sure you want to delete this Language?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 mr-2 rounded bg-gray-400 px-4 py-2 hover:bg-gray-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteLanguage}
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

export default LanguagesList;
