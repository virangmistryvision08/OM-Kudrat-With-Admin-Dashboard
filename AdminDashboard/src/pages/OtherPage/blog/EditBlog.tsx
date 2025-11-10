import React, { useState, ChangeEvent, useEffect } from "react";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Input from "../../../components/form/input/InputField";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Alert from "../../../components/ui/alert/Alert";
import cookie from "js-cookie";

interface FormData {
  blogName: string;
  htmlContent: string;
  blogImage: File | null;
  slug: string;
}

interface FormErrors {
  blogName?: string;
  htmlContent?: string;
  blogImage?: string;
  slug: string;
}

const EditBlog: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    blogName: "",
    htmlContent: "",
    blogImage: null,
    slug: "",
  });
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null>(null);
  const { slug } = useParams();
  const [token, setToken] = useState(
    cookie.get(`${import.meta.env.VITE_COOKIE_TOKEN_NAME}`)
  );

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    get_single_blog();
  }, [slug]);

  const get_single_blog = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/blog/get-one-blog/${slug}`)
      .then((res) => {
        setFormData({ ...res.data.data });
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    const value =
      e.target.type === "file" ? e.target.files?.[0] || null : e.target.value;

    // File validation
    if (field === "blogImage" && value) {
      const file = value as File;
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2MB
      let error = "";

      if (!allowedTypes.includes(file.type))
        error = "Only JPG, JPEG, or PNG files allowed.";
      else if (file.size > maxSize) error = "File size must be less than 2MB.";

      if (error) {
        setErrors((prev) => ({ ...prev, blogImage: error }));
        setFormData((prev) => ({ ...prev, blogImage: null }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, blogImage: undefined }));
      }
    }

    // Update form data
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error dynamically
    if (value && field !== "blogImage") {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.blogName.trim()) newErrors.blogName = "Title is required!";
    if (!formData.htmlContent.trim())
      newErrors.htmlContent = "Content is required!";
    if (!formData.blogImage) newErrors.blogImage = "Blog image is required!";
    if (!formData.slug) newErrors.slug = "Blog slug is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = new FormData();
    payload.append("blogName", formData.blogName);
    payload.append("htmlContent", formData.htmlContent);
    payload.append("slug", formData.slug);
    if (formData.blogImage) payload.append("blogImage", formData.blogImage);

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/blog/update-blog/${slug}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/blogs");
      setAlert({
        variant: "info",
        title: "Update!",
        message: "Blog Update Successfully.",
      });
      setFormData({
        blogName: "",
        htmlContent: "",
        blogImage: null,
        slug:""
      });
    } catch (error) {
      setAlert({
        variant: "error",
        title: "Error!",
        message: "Blog Error!",
      });
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div>
      <PageMeta
        title="Add Blog | TailAdmin Dashboard"
        description="Create a new blog post in the TailAdmin dashboard."
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
        <div className="flex justify-between items-center mb-7">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            Update Blog
          </h1>
          <div
            onClick={() => navigate("/blogs")}
            className="rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200 h-12 w-12 text-white flex justify-center items-center cursor-pointer"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="blogName"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <Input
              id="blogName"
              placeholder="Enter blog title"
              value={formData.blogName}
              onChange={(e) => handleInputChange(e, "blogName")}
              error={!!errors.blogName}
              hint={errors.blogName}
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Slug
            </label>
            <Input
              id="slug"
              placeholder="Enter slug"
              value={formData.slug}
              onChange={(e) => handleInputChange(e, "slug")}
              error={!!errors.slug}
              hint={errors.slug}
            />
          </div>

          <div>
            <label
              htmlFor="blogImage"
              className="font-medium text-gray-700 dark:text-gray-300"
            >
              Blog Image
            </label>
            <Input
              id="blogImage"
              type="file"
              onChange={(e) => handleInputChange(e, "blogImage")}
              className="cursor-pointer"
              error={!!errors.blogImage}
              hint={errors.blogImage}
            />
            {formData.blogImage && (
              <div className="mt-2">
                <img
                  src={
                    typeof formData.blogImage === "string"
                      ? formData.blogImage
                      : URL.createObjectURL(formData.blogImage)
                  }
                  alt="Preview"
                  className="h-24 w-24 rounded-md object-cover border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="font-medium text-gray-700 dark:text-gray-300">
              Blog Content
            </label>
            <ReactQuill
              theme="snow"
              value={formData.htmlContent}
              onChange={(value) =>
                handleInputChange({ target: { value } } as any, "htmlContent")
              }
              placeholder="Write blog content here..."
            />
            {errors.htmlContent && (
              <p className="mt-1.5 text-xs text-error-500">
                {errors.htmlContent}
              </p>
            )}
          </div>
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 hover:bg-blue-600 transition-colors duration-200 w-fit px-4 py-2 text-white"
          >
            Update Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
