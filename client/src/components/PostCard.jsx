import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Post Image */}
      {post.image && (
        <img
          src={post.image || "https://via.placeholder.com/150"} // Fallback image
          alt="Post"
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-6">
        {/* Category */}
        {post.category && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs mb-2 inline-block">
            {post.category || "category"}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h3>

        {/* Author */}
        <div className="flex items-center text-gray-500 mb-4 text-sm">
          {/* {post.author_image && ( */}
            <img
              src={post.author_image || "assets/images/23042919.jpg"}
              alt="Author"
              className="w-8 h-8 rounded-full mr-2 border mt-1"
            />
          {/* )} */}
          <div>
            <span>By <strong className="text-lg text-gray-800">{post?.author_name || "Unknown"}</strong></span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4">
          {/* Read More Link */}
          <Link
            to={`/post/${post.id}`}
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300 flex items-center"
          >
            Read More
            <i className="fa-solid fa-arrow-right h-5 w-5 mt-2 ml-2"></i>
          </Link>

          {/* Created At */}
          <span className="px-2 py-1 text-xs text-gray-800">Posted at

            <span className="px-2 py-1 ml-1 text-xs text-gray-800 bg-gray-100 rounded-full">
              {post.created_at}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
