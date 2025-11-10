import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import note from "../../public/blog/note.svg";
import { Divider } from "@mui/material";
import Footer from "./Footer";

const SingleBlog = () => {
  const [blog, setBlog] = useState({});
  const [otherBlogs, setOtherBlogs] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    get_single_blog();
    get_other_blogs();
  }, [slug]);

  const get_single_blog = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/blog/get-one-blog/${slug}`)
      .then((res) => {
        setBlog({ ...res.data.data });
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const get_other_blogs = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/blog/other-blogs/${slug}`)
      .then((res) => {
        setOtherBlogs([...res.data.data]);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  return (
    <>
      <section className="w-full mt-24 bg-white font-[Poppins]">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          {/* Top Section */}
          <section className="relative bg-white min-h-72 rounded-2xl blog-details-bg">
            <div className="bg-white w-fit pe-8 pt-3 rounded-tr-2xl absolute left-0 bottom-0">
              <h1 className="font-[BelfastGrotesk] text-3xl">Blogs Detail</h1>
              <p className="text-xs mt-2">Home > Blog</p>
            </div>
          </section>

          {/* Single Blog Details */}
          <div className="my-10 md:my-20">
            <h1 className="text-2xl md:text-3xl xl:text-4xl mb-3 font-[BelfastGrotesk]">
              {blog.blogName}
            </h1>
            {blog.createdAt ? (
              <span className="text-gray-500 text-sm">
                By {blog.by} |{" "}
                {format(new Date(blog.createdAt), "MMM dd, yyyy")}
              </span>
            ) : (
              <span className="text-gray-400 text-sm">Loading...</span>
            )}
            <div
              className="mt-5"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.htmlContent),
              }}
            ></div>
          </div>

          {/* Comment Section */}
          <div className="bg-[#EFEFEF] p-5 md:p-10 rounded-2xl">
            <h1 className="text-2xl font-[BelfastGrotesk]">5 Comments</h1>
            <div>
              <div className="mt-10">
                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">June 5, 2024</p>
                    </div>
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">James Crader</p>
                    </div>
                  </div>
                  <Divider className="!my-5 w-full md:w-1/3" />
                </div>
                <p className="text-gray-700">
                  Id semper risus in hendrerit gravida rutrum quisque non
                  tellus. Sed lectus vestibulum mattis ullamcorper. Amet
                  venenatis urna cursus eget nunc. Eu augue ut lectus arcu.
                  Fermentum iaculis eu non diam phasellus vestibulum lorem sed
                  risus. Amet venenatis urna cursus eget nunc.
                </p>
              </div>
              <div className="mt-10">
                <div className="flex flex-col w-full xl:w-1/3 2xl:w-1/4">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">June 5, 2024</p>
                    </div>
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">James Crader</p>
                    </div>
                  </div>
                  <Divider className="!my-5 w-full md:w-1/2 xl:w-full" />
                </div>
                <p className="text-gray-700">
                  Id semper risus in hendrerit gravida rutrum quisque non
                  tellus. Sed lectus vestibulum mattis ullamcorper. Amet
                  venenatis urna cursus eget nunc. Eu augue ut lectus arcu.
                  Fermentum iaculis eu non diam phasellus vestibulum lorem sed
                  risus. Amet venenatis urna cursus eget nunc.
                </p>
              </div>
              <div className="mt-10">
                <div className="flex flex-col w-full xl:w-1/3 2xl:w-1/4">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">June 5, 2024</p>
                    </div>
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">James Crader</p>
                    </div>
                  </div>
                  <Divider className="!my-5 w-full md:w-1/2 xl:w-full" />
                </div>
                <p className="text-gray-700">
                  Id semper risus in hendrerit gravida rutrum quisque non
                  tellus. Sed lectus vestibulum mattis ullamcorper. Amet
                  venenatis urna cursus eget nunc. Eu augue ut lectus arcu.
                  Fermentum iaculis eu non diam phasellus vestibulum lorem sed
                  risus. Amet venenatis urna cursus eget nunc.
                </p>
              </div>
              <div className="mt-10">
                <div className="flex flex-col w-full xl:w-1/3 2xl:w-1/4">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">June 5, 2024</p>
                    </div>
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">James Crader</p>
                    </div>
                  </div>
                  <Divider className="!my-5 w-full md:w-1/2 xl:w-full" />
                </div>
                <p className="text-gray-700">
                  Id semper risus in hendrerit gravida rutrum quisque non
                  tellus. Sed lectus vestibulum mattis ullamcorper. Amet
                  venenatis urna cursus eget nunc. Eu augue ut lectus arcu.
                  Fermentum iaculis eu non diam phasellus vestibulum lorem sed
                  risus. Amet venenatis urna cursus eget nunc.
                </p>
              </div>
              <div className="mt-10">
                <div className="flex flex-col w-full xl:w-1/3 2xl:w-1/4">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">June 5, 2024</p>
                    </div>
                    <div className="flex gap-3">
                      <img src={note} alt="note" />
                      <p className="font-semibold">James Crader</p>
                    </div>
                  </div>
                  <Divider className="!my-5 w-full md:w-1/2 xl:w-full" />
                </div>
                <p className="text-gray-700">
                  Id semper risus in hendrerit gravida rutrum quisque non
                  tellus. Sed lectus vestibulum mattis ullamcorper. Amet
                  venenatis urna cursus eget nunc. Eu augue ut lectus arcu.
                  Fermentum iaculis eu non diam phasellus vestibulum lorem sed
                  risus. Amet venenatis urna cursus eget nunc.
                </p>
              </div>
            </div>
            <div className="w-full mt-10">
              <h1 className="text-2xl font-[BelfastGrotesk]">Leave Comment</h1>
              <form
                className="w-full flex flex-col gap-4 md:gap-6 mt-7"
                action=""
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  <input
                    className="w-full h-12 rounded-full ps-5 bg-transparent outline-[#018D43] border border-gray-300 placeholder:text-gray-600"
                    type="text"
                    placeholder="Your Name*"
                  />
                  <input
                    className="w-full h-12 rounded-full ps-5 bg-transparent outline-[#018D43] border border-gray-300 placeholder:text-gray-600"
                    type="text"
                    placeholder="Your Email*"
                  />
                </div>
                <textarea
                  className="w-full min-h-52 rounded-3xl p-5 bg-transparent outline-[#018D43] border border-gray-300 placeholder:text-gray-600"
                  name="message"
                  id="message"
                  placeholder="Message"
                ></textarea>
                <button className="px-7 py-3 bg-[#018D43] text-white rounded-full w-fit">
                  Post Comment
                </button>
              </form>
            </div>
          </div>

          {/* Other Blogs */}
          <div className="my-14 xl:my-24">
            <h1 className="text-3xl xl:text-3xl font-[BelfastGrotesk] mb-5 xl:mb-10">Other Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {otherBlogs.map((blg) => {
                return (
                  <div className="flex flex-col justify-between gap-5 h-[450px]">
                    <img
                      className="h-[60%] w-auto object-cover rounded-2xl"
                      src={blg.blogImage}
                      alt={blg.blogName}
                    />
                    <h1 className="text-2xl line-clamp-1">{blg.blogName}</h1>
                    <p
                      className="line-clamp-2 font-[400] text-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(blg.htmlContent),
                      }}
                    ></p>
                    <button
                      onClick={() => navigate(`/blog/${blg.slug}`)}
                      className="px-7 py-3 bg-[#018D43] text-white rounded-full w-fit"
                    >
                      Read More
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SingleBlog;
