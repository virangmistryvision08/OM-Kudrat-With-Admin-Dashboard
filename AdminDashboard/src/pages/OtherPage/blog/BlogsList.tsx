import React, { useEffect, useState } from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table/index";
import { format } from "date-fns";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router";
import { Modal } from "../../../components/ui/modal";
import Alert from "../../../components/ui/alert/Alert";
import DOMPurify from "dompurify";

interface Blog {
  id: string;
  blogName: string;
  shortDescription: string;
  blogImage: string;
  htmlContent: string;
  createdAt: string;
}

interface BlogsResponse {
  data: Blog[];
  totalPages?: number;
}

const BlogsList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null>(null);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    getAllBlogs(currentPage, limit);
  }, [currentPage, limit]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const getAllBlogs = async (page: number, limit: number) => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("blogLimit", limit.toString());

      const res = await axios.get<BlogsResponse>(
        `${import.meta.env.VITE_BACKEND_URL
        }/blog/get-all-blogs?${queryParams.toString()}`
      );

      const blogsData = res.data.data || [];
      const pagination = res.data.pagination || {};

      if (blogsData.length === 0 && page > 1) {
        setCurrentPage(page - 1);
        return;
      }

      setBlogs(blogsData);
      setTotalBlogs(pagination.totalBlogs || 0);
      setTotalPages(pagination.totalPages || 1);
      setCurrentPage(pagination.currentPage || 1);
    } catch (error) {
      console.error("Error fetching blogs:", error);
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
    setBlogToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteBlog = () => {
    if (!blogToDelete) return;

    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/blog/delete-blog/${blogToDelete}`
      )
      .then((res) => {
        getAllBlogs(currentPage, limit);
        setAlert({
          variant: "success",
          title: "Deleted!",
          message: res.data.message,
        });
        setDeleteModalOpen(false);
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

  return (
    <div>
      <PageMeta
        title="Blogs List | TailAdmin - Next.js Admin Dashboard Template"
        description="Manage all Blogs in the TailAdmin dashboard."
      />
      <PageBreadcrumb pageTitle="Blogs" />

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
        {/* Header */}
        <div className="flex justify-end items-center mb-7">
          <button
            onClick={() => navigate("/blogs/add-blog")}
            className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 px-4 py-2 text-white flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Add Blog
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
                    Blog Image
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Title
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-6 py-3 font-semibold text-gray-600 text-left text-theme-xs dark:text-gray-400"
                  >
                    Description
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
                {blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      <img
                        className="h-16 w-16 object-cover rounded-xl"
                        src={blog.blogImage}
                        alt={blog.blogName}
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      {blog.blogName}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-800 dark:text-gray-300 text-left truncate max-w-[220px]">
                      <div
                        className="!line-clamp-1 font-[400] text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(blog.htmlContent),
                        }}
                      />
                    </TableCell>
                    <TableCell className="px-6 py-4 text-gray-500 dark:text-gray-400 text-left whitespace-nowrap">
                      {format(new Date(blog.createdAt), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-left flex justify-center items-center gap-3 whitespace-nowrap">
                      <button
                        onClick={() =>
                          navigate(`/blogs/update-blog/${blog._id}`)
                        }
                        className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 h-10 w-10 text-white"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => openDeleteModal(blog._id)}
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
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 gap-3">
            {currentPage > 1 && (
              <button
                onClick={goToFirstPage}
                className="px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-100 dark:!text-gray-200 dark:hover:bg-gray-700"
              >
                First
              </button>
            )}

            <Stack spacing={2}>
              <Pagination
                className="dark:!text-gray-200 !text-white"
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                hidePrevButton={currentPage === 1}
                hideNextButton={currentPage === totalPages}
              />
            </Stack>

            {currentPage < totalPages && (
              <button
                onClick={goToLastPage}
                className="px-4 py-2 border border-gray-600 rounded-full hover:bg-gray-100 dark:!text-gray-200 dark:hover:bg-gray-700"
              >
                Last
              </button>
            )}
          </div>
        )}

        <div className="text-end mt-4">
          <select defaultValue={5} dir="rtl" onChange={changeLimit} name="productLimit" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>{" "}
          of {totalBlogs}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <div className="text-start">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-300">
            Are you sure you want to delete this Blog?
          </h3>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteBlog}
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

export default BlogsList;
