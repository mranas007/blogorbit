import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post, onEdit, onDelete }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full"
    >
      {/* Post Image */}
      <div className="w-full h-48 bg-gray-200 flex-shrink-0">
        {post.image ? (
          <img
            src={post.image}
            alt="Post"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category */}
        {post.category && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs mb-2 inline-block">
            {post.category || "category"}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 flex-1">
          {post.title}
        </h3>

        {/* Author */}
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <img
            src={post.author_image || "assets/images/23042919.jpg"}
            alt="Author"
            className="w-8 h-8 rounded-full mr-2 border"
          />
          <div>
            <span>
              By{" "}
              <strong className="text-lg text-gray-800">
                {post?.author_name || "Unknown"}
              </strong>
            </span>
          </div>
        </div>

        {/* Footer: Read More and Created At */}
        <div className="flex items-center justify-between mt-auto">
          <Link
            to={`/post/${post.id}`}
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300 flex items-center"
          >
            Read More
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </Link>

          <span className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded-full">
            {post.created_at}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
