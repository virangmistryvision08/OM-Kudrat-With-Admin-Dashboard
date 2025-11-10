import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const OurBlog = () => {
  const [blogs, setblogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    get_three_latest_blogs();
  }, []);

  const get_three_latest_blogs = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/top-three-latest-blogs`).then((res) => {
      setblogs([...res.data.data]);
    }).catch((error) => {
      console.log(error,'error');
    })
  }

  return (
    <section className="w-full pb-20">
      <div className="w-[90%] lg:w-[80%] mx-auto font-[Poppins]">
        <header className="flex flex-col lg:flex-row justify-between items-start gap-0 mb-8">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 font-[BelfastGrotesk]">
            From Our Blog
          </h2>
          <p className="text-gray-600 w-full lg:w-[49%] text-sm md:text-base lg:text-end leading-relaxed">
            Explore our blog to discover the benefits of various spices,
            gardening tips, and delicious recipes that showcase the vibrant
            tastes of our products.
          </p>
        </header>

        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
            {
                blogs.map((blog) => {
                    return (
                        <div key={blog._id} className="rounded-2xl h-fit">
                            <img onClick={() => navigate(`/blog/${blog.slug}`)} className="h-[300px] w-[100%] object-cover rounded-2xl cursor-pointer" src={blog.blogImage} alt={blog.blogName} />
                            <p onClick={() => navigate(`/blog/${blog.slug}`)} className="font-semibold text-xl mt-2 mb-2 line-clamp-2 font-[BelfastGrotesk] cursor-pointer">{blog.blogName}</p>
                            <span className="text-gray-500 text-sm">By {blog.by} | {format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
                        </div>
                    )
                })
            }
        </div>
      </div>
    </section>
  );
};

export default OurBlog;
