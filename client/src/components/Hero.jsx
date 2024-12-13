import React from "react";
import { Link } from "react-router-dom";

function Hero({ post }) {

  // const featuredPost = {
  //   title: "The Impact of Technology on the Workplace: How Technology is Changing",
  //   category: "Technology",
  //   author: "Jason Francisco",
  //   date: "August 20, 2022",
  //   image: "/assets/images/hero.png",
  // };

  return (
    <section className="relative">
      {/* Featured Image */}
      <img
        src={post.image || "/assets/images/hero.png"}
        alt="image..."
        className="w-full object-cover"
      />

      {/* BlogCard */}
      <div className="absolute bottom-[-160px] md:bottom-[-40px] left-0 md:left-16">

        <div className="bg-white shadow-lg rounded-lg p-6 max-w-[70%] mx-auto md:mx-0 sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          {/* Category Tag */}
          <div className="flex justify-between items-center">
            <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-2 rounded-md mb-2">
              {post.category && post.category || "Category"}
            </span>
            <Link
              to={`/post/${post.id}`}
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300 flex items-center"
            >
              Read More
              <i className="fa-solid fa-arrow-right h-5 w-5 mt-2 ml-2"></i>
            </Link>
          </div>
          {/* Title */}
          <h2 className="font-bold text-gray-800 mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
            {post.title && post.title}
          </h2>

          {/* Author and Date */}
          <div className="flex items-center mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
            <img
              src={post.author_image || "assets/images/23042919.jpg"}
              alt={"author..."}
              className="w-10 h-10 rounded-full mr-2 border mt-0.5"
            />

            <div className="flex items-center gap-1">
              <p>By <strong className="text-lg text-gray-800">{post?.author_name || "Unknown"}</strong> |</p>
              <span className="text-xs text-gray-800">posted at
                <span className="px-2 py-1 ml-1 text-xs text-gray-800 bg-gray-100 rounded-full">
                  {new Date(post.created_at).toLocaleDateString() || "Unknown date"}
                </span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
