import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import PageLoader from "../components/PageLoader";
import axiosApi from "../services/axiosApi";

// Auth Context
import { useAuthContext } from "../context/AuthContext";

const Blog = () => {
    const navigate = useNavigate();
    const { token } = useAuthContext();

    const [loading, setLoading] = useState(true); // Tracks loading state
    const [posts, setPosts] = useState({ blogs: [], pagination: {} }); // Holds blog posts and pagination data
    const [notFound, setNotFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page

    // Redirect to login if no token
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    // Fetch blog posts
    const fetchData = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axiosApi.get(`/blog/all?page=${page}`);
            if (response.data.status) {
                setPosts(response.data);
                setCurrentPage(page);
            } else if (response.data.status === false) {
                setNotFound(true);
            } else {
                console.error("Error fetching blog posts:", response.data.error);
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount or when the current page changes
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    if (loading) {
        return <PageLoader />;
    }

    if (notFound) {
        return <div>Posts Not Found</div>;
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            {/* Gradient Header */}
            <header className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-pattern"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight transform hover:scale-105 transition duration-300">
                        Inspiration, Ideas & Insights
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                        Discover stories, tips, and trends across tech, creativity, and life.
                    </p>
                </div>
            </header>

            {/* Blog Posts Grid */}
            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.blogs.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </div>
            </main>

            {/* <<<<<<<<<<<<<<<<<<<<<<<< Pagination >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <nav className="container mx-auto px-6 py-12 flex justify-center">
                <div className="inline-flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                        aria-label="Previous Page"
                        onClick={() => fetchData(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg shadow-md transition transform duration-300 ${currentPage === 1
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
                            }`}
                    >
                        Previous
                    </button>

                    {/* Pagination Buttons */}
                    <div className="flex space-x-2">
                        {Array.from({ length: posts.pagination.last_page }, (_, i) => i + 1)
                            .filter(page =>
                                page === 1 || // Always show the first page
                                page === posts.pagination.last_page || // Always show the last page
                                (page >= currentPage - 1 && page <= currentPage + 1) // Show one page before and after the current page
                            )
                            .map((page, index, pages) => (
                                <>
                                    {/* Add ellipsis if there's a gap */}
                                    {index > 0 && page - pages[index - 1] > 1 && (
                                        <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-500">
                                            ...
                                        </span>
                                    )}
                                    <button
                                        key={page}
                                        aria-label={`Page ${page}`}
                                        onClick={() => fetchData(page)}
                                        className={`w-10 h-10 rounded-full ${page === currentPage
                                            ? "bg-indigo-500 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            } transition duration-300`}
                                    >
                                        {page}
                                    </button>
                                </>
                            ))}
                    </div>

                    {/* Next Button */}
                    <button
                        aria-label="Next Page"
                        onClick={() => fetchData(currentPage + 1)}
                        disabled={currentPage === posts.pagination.last_page}
                        className={`px-4 py-2 rounded-lg shadow-md transition transform duration-300 ${currentPage === posts.pagination.total
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:scale-105"
                            }`}>
                        Next
                    </button>
                </div>
            </nav>

        </div>
    );
};

export default Blog;
