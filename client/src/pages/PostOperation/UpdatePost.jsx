import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { toast } from "react-toastify";
import ButtonLoader from "../../components/ButtonLoader";
import PageLoader from "../../components/PageLoader"; // Assuming you have a PageLoader component
import axiosApi from "../../services/axiosApi";

// Auth context
import { useAuthContext } from '../../context/AuthContext'

const UpdatePost = () => {
  // check if user's token doesn't exist then redirect to login
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const params = useParams();

  // Form Data
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });

  // Fetch existing post data when component mounts
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPostData = async () => {
      try {
        setIsPageLoading(true);
        const response = await axiosApi.get(`/user/blog/${params.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === true) {
          const { title, category, content } = response.data.blog[0];
          setFormData({
            title: title,
            category: category || "",
            content: content || ""
          });
        } else {
         toast.error("Failed to fetch post details");
          navigate("/myposts");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.warn("Error fetching post details");
        navigate("/myposts");
      } finally {
        setIsPageLoading(false);
      }
    };

    fetchPostData();
  }, [token, params.id, navigate]);

  // Handle submission form
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true)
      setErrors({})
      const response = await axiosApi.patch(
        `/user/blog/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      // Success Post
      if (response.data.status === true) {
       toast.success("Successfully Updated!");
        navigate("/myposts");
      }

      // handling for Client-provided errors
      if (response.data.status === false) {
        setErrors(response.data.errors);
      }

    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error("Update failed. Please check your inputs.");
      } else {
        toast.warn("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false)
    }
  };

  // Handle input changes
  const handleInputChange = (field) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  // If page is loading, show PageLoader
  if (isPageLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Update Your Story
            </h1>
            <p className="text-gray-600 mt-2">Edit and refine your thoughts</p>
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
          <div className={`${errors.title ? "border-2 border-red-500" : ""} group bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg`}>
            <div className="flex items-center gap-3 text-gray-800 group-focus-within:text-indigo-700">
              <span className="text-xl">✨</span>
              <input
                type="text"
                value={formData.title}
                onChange={handleInputChange('title')}
                placeholder="Give your story a title..."
                className="w-full text-xl font-medium outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
          {errors.title && <small className="text-red-500">{errors.title}</small>}

          {/* Category Selection */}
          <div className={`${errors.category ? "border-2 border-red-500" : ""} bg-white rounded-xl shadow-md p-4`}>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-xl">#</span>
              <select
                value={formData.category}
                onChange={handleInputChange('category')}
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
          {errors.category && <small className="text-red-500">{errors.category}</small>}

          {/* WYSIWYG Editor */}
          <div className={`${errors.content ? "border-2 border-red-500" : ""} bg-white rounded-xl shadow-md p-4`}>
            <Editor
              required
              placeholder="Write Your Blog..."
              value={formData.content}
              onChange={handleInputChange('content')}
              className="min-h-[300px] w-full"
            />
          </div>
          {errors.content && <small className="text-red-500">{errors.content}</small>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
            disabled={loading} >
            {loading ? <ButtonLoader size='lg' variant='white' /> : "Update Story"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;