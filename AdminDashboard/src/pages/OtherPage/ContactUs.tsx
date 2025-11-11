import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table/index";
import { format } from "date-fns";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { Modal } from "../../components/ui/modal";
import Alert from "../../components/ui/alert/Alert";
import cookie from "js-cookie";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import { PaginationItem } from "@mui/material";

interface ContactUs {
  id: string;
  name: string;
  email: string;
  question: string;
  createdAt: string;
}

interface ContactUsResponse {
  data: ContactUs[];
  totalPages?: number;
}

const ContactUs: React.FC = () => {
  const [questions, setQuestions] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null>(null);
  const [limit, setLimit] = useState(5);
  const [token, setToken] = useState(
    cookie.get(`${import.meta.env.VITE_COOKIE_TOKEN_NAME}`)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    question: "",
  });

  useEffect(() => {
    getAllQuestions(currentPage, limit);
  }, [currentPage, limit]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const getAllQuestions = async (page: number, limit: number) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      const res = await axios.get<ContactUsResponse>(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/contact-us/get-questions?${queryParams.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const questionsData = res.data.data || [];
      const pagination = res.data.pagination || {};

      if (questionsData.length === 0 && page > 1) {
        setCurrentPage(page - 1);
        return;
      }

      setQuestions(questionsData);
      setTotalQuestions(pagination.totalQuestions || 0);
      setTotalPages(pagination.totalPages || 1);
      setCurrentPage(pagination.currentPage || 1);
    } catch (error) {
      console.error("Error fetching Questions:", error);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const goToFirstPage = () => {
    if (currentPage > 1) setCurrentPage(1);
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) setCurrentPage(totalPages);
  };

  const openDeleteModal = (id: string) => {
    setQuestionId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteQuestion = () => {
    if (!questionId) return;

    axios
      .delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/contact-us/delete-question/${questionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        getAllQuestions(currentPage, limit);
        setAlert({
          variant: "success",
          title: "Deleted!",
          message: res.data.message,
        });
        setDeleteModalOpen(false);
        setQuestionId(null);
      })
      .catch((error) => {
        setDeleteModalOpen(false);
        console.log(error, "error");
      });
  };

  const changeLimit = (e: number) => {
    const newLimit = +e.target.value;
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: "", email: "", question: "" };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Question validation
    if (!formData.question.trim()) {
      newErrors.question = "Please enter your question.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleGetQuestion = (id) => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/contact-us/get-one-question/${id}`,
        { headers: { Authorization: `Brearer ${token}` } }
      )
      .then((res) => {
        setQuestionId(res.data.data._id);
        setFormData({ ...res.data.data });
      })
      .catch((error) => {
        setAlert({
          variant: "error",
          title: "Error!",
          message: error.response ? error.response.data.message : error.message,
        });
      });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      axios
        .patch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/contact-us/update-question/${questionId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          getAllQuestions(currentPage, limit);
          setIsModalOpen(false);
          setAlert({
            variant: "info",
            title: "Update!",
            message: res.data.message,
          });
        })
        .catch((error) => {
          setIsModalOpen(false);
          setAlert({
            variant: "error",
            title: "Error!",
            message: error.response
              ? error.response.data.message
              : error.message,
          });
        });

      setFormData({ name: "", email: "", question: "" });
    }
  };

  return (
    <div>
      <PageMeta
        title="Questions List | TailAdmin - Next.js Admin Dashboard Template"
        description="Manage all Questions in the TailAdmin dashboard."
      />
      <PageBreadcrumb pageTitle="Questions" />

      {alert && (
        <div className="mb-5 fixed top-4 right-4 z-999999">
          <Alert
            variant={alert.variant}
            title={alert.title}
            message={alert.message}
          />
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white !px-7 !py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
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
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Question
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
                {questions.map((question) => (
                  <TableRow key={question._id}>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      {question.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      {question.email}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px] line-clamp-1">
                      {question.question}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-500 dark:text-gray-400 text-left whitespace-nowrap">
                      {format(new Date(question.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-left flex justify-center items-center gap-3 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          handleGetQuestion(question._id);
                        }}
                        className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 h-10 w-10 text-white"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => openDeleteModal(question._id)}
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

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 gap-7">
          <div className="flex items-center justify-end gap-2 dark:text-white/90">
            Rows Per Page
            <select
              className="border"
              defaultValue={5}
              // dir="rtl"
              onChange={changeLimit}
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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="text-start">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-300">
            Are you sure you want to delete this Question?
          </h3>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteQuestion}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Add or Update Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({
            name: "",
            email: "",
            question: "",
          });
        }}
      >
        <form onSubmit={handleUpdate} className="space-y-0 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Update</h2>

          <Input
            className="mt-2"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            hint={errors.name}
          />

          <Input
            className="mt-4"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            hint={errors.email}
          />

          <TextArea
            className="mt-4"
            placeholder="Type your question here..."
            value={formData.question}
            onChange={(value) =>
              handleChange({
                target: { name: "question", value },
              } as React.ChangeEvent<HTMLTextAreaElement>)
            }
            error={!!errors.question}
            hint={errors.question}
          />

          <button
            type="submit"
            className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2.5 rounded-lg transition mt-5"
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ContactUs;
