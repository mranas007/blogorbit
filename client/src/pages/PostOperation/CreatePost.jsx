import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { toast } from "react-toastify";
import ButtonLoader from "../../components/ButtonLoader";
import axiosApi from "../../services/axiosApi";

// Auth context
import { useAuthContext } from '../../context/AuthContext'

const CreatePost = () => {

  // check it user's token doesn't exist then redirect to login
  const navigate = useNavigate();
  const { userId, token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const [errors, setErrors] = useState({})
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  // Updated State and Form Submission
  const [formData, setFormData] = useState({
    author_id: "",
    title: "",
    category: "",
    content: "",
    image: null
  });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      title: title,
    }));
  };

  // Updated Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Comprehensive File Validation
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      const maxFileSize = 2 * 1024 * 1024; // 2MB

      if (!validImageTypes.includes(file.type)) {
        toast.error(`Unsupported image format: ${file.type}`);
        return;
      }

      if (file.size > maxFileSize) {
        toast.error('File size exceeds 2MB limit');
        return;
      }

      setFormData({ image: file }) // set to form data
    }
  };

  // Updated Drag and Drop Handler
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      // Perform the same validations as in handleImageUpload
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
      const maxFileSize = 2 * 1024 * 1024; // 2MB

      if (!validImageTypes.includes(file.type)) {
        toast.error(`Unsupported image format: ${file.type}`);
        return;
      }

      if (file.size > maxFileSize) {
        toast.error('File size exceeds 2MB limit');
        return;
      }
      setFormData({ image: file })
    } else {
      toast.error("Invalid file type!");
    }
  };

  // Comprehensive Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for multipart upload
    const formDataToSend = new FormData();

    // Append all text fields
    formDataToSend.append('author_id', userId);  // Use userId directly
    formDataToSend.append('title', formData.title);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('content', formData.content);

    // Append image if exists
    const imageInput = document.getElementById('image');
    if (imageInput && imageInput.files[0]) {
      setFormData({ image: imageInput.files[0] })
      formDataToSend.append('image', imageInput.files[0]);
    }

    try {
      setLoading(true);
      setErrors({});  // Reset errors before submission

      const response = await axiosApi.post('/user/blog/store', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Success handling
      if (response.data.status === true) {
        toast.success("Blog posted successfully!");
        navigate("/myposts");
      }

      // Client-side validation errors
      if (response.data.status === false) {
        setErrors(response.data.errors || {});
      }

    } catch (error) {
      // Comprehensive error handling
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        console.error("Blog post error:", error.response.data);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create Your Story
            </h1>
            <p className="text-gray-600 mt-2">Share your thoughts with the world</p>
          </div>
          <button
            onClick={() => navigate(-1)} // Go back
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300">
            <span className="text-xl leading-none">←</span>
            <span>Cancel</span>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-8">
          {/* Title Input */}
          <div className={`${errors.title && "border-2 border-red-500"} group bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg`}>
            <div className="flex items-center gap-3 group-focus-within:text-indigo-500">
              <span className="text-xl">✨</span>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Give your story a title..."
                className="w-full text-xl font-medium outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          {
            errors.title && <small className="text-red-500">{errors.title}</small>
          }


          {/* Category Selection */}
          <div className={`${errors.category && "border-2 border-red-500"} bg-white rounded-xl shadow-md p-4`}>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-xl">#</span>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prevData) => ({ ...prevData, category: e.target.value }))
                }
                className="w-full outline-none appearance-none bg-transparent text-gray-700">
                <option value="" disabled>
                  Select a category...
                </option>
                <option value="Technology">Technology</option>
                <option value="Sport">Sport</option>
                <option value="News">News</option>
                <option value="Travel">Travel</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Education">Education</option>
                <option value="Literature">Literature</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {
            errors.category && <small className="text-red-500">{errors.category}</small>
          }

          {/* WYSIWYG Editor */}
          <div className={`${errors.content && "border-2 border-red-500"} bg-white rounded-xl shadow-md p-4`}>
            <Editor
              required
              placeholder="Write Your Blog..."
              value={formData.content}
              onChange={(e) =>
                setFormData((prevData) => ({ ...prevData, content: e.target.value }))
              }
              className="min-h-[300px] w-full"
            />
          </div>
          {
            errors.content && <small className="text-red-500">{errors.content}</small>
          }

          {/* Image Upload Area */}
          <div
            className={`${errors.image && "border-2 border-red-500"} border-4 relative bg-white rounded-xl shadow-md p-8 transition-all duration-300 ${isDragging ? "border-4 border-dashed border-indigo-500 bg-indigo-50" : ""
              }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}>
            <input
              type="file"
              id="image"
              accept="image/jpeg,image/png,image/jpg,image/gif"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label htmlFor="image" className={`flex flex-col items-center justify-center cursor-pointer`}>
              <span className="text-4xl mb-4">📷</span>
              {formData.image ? (
                <div className="text-center">
                  <p className="text-indigo-600 font-medium">{formData.image.name}</p>
                  <p className="text-sm text-gray-500 mt-1">Click or drag to replace</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-700 font-medium">Drop your image here</p>
                  <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                </div>
              )}
            </label>
          </div>
          {
            errors.image && <small className="text-red-500">{errors.image}</small>
          }

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
            disabled={loading} >
            {loading ? <ButtonLoader size='lg' variant='white' /> : "Publish Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
