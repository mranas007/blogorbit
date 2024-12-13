import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import PageLoader from '../components/PageLoader';
import axiosApi from '../services/axiosApi';

// Auth Context
import { useAuthContext } from '../context/AuthContext';

const Blog = () => {
    // check it user's token doesn't exist then redirect to login
    const navigate = useNavigate();
    const { token } = useAuthContext();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const [loading, setLoading] = useState(true); // Tracks loading state
    const [posts, setPosts] = useState([]); // Holds blog posts
    const [notFound, setNotFound] = useState(false);

    // Fetch blog posts
    const fetchData = async () => {
        try {
            const response = await axiosApi.get(`/blogs`);
            if (response.data.status) {
                setPosts(response.data.blogs);
            } else if (response.data.status === false) {
                setNotFound(true)
            } else {
                console.error('Error fetching blog posts:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <PageLoader />;
    }

    if (notFound) {
        return <PostNotFound />;
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
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))}
                </div>
            </main>

            {/* Pagination */}
            <nav className="container mx-auto px-6 py-12 flex justify-center">
                <div className="inline-flex items-center space-x-2">
                    <button
                        aria-label="Previous Page"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-105 duration-300"
                    >
                        Previous
                    </button>
                    <div className="flex space-x-2">
                        {posts.map((page, index) => (
                            <button
                                key={index}
                                aria-label={`page ${index}`}
                                className={`w-10 h-10 rounded-full ${index === 1
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    } transition duration-300`}
                            >
                                {index}
                            </button>
                        ))}
                    </div>
                    <button
                        aria-label="Next Page"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-105 duration-300"
                    >
                        Next
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Blog;
