import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import PageLoader from '../components/PageLoader';
import PostNotFound from '../components/PostNotFound';
import axiosApi from '../services/axiosApi';

// Auth Context
import { useAuthContext } from '../context/AuthContext';

const ReadPost = () => {
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
    const [notFound, setNotFound] = useState(false) // post not found
    // Fetch blog posts
    const fetchData = async () => {
        try {
            const response = await axiosApi.get(`/blog/all`);
            if (response.data.status) {
                setPosts(response.data.blogs);
            } else if (response.data.status === 404) {
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
        <>
            {/* Main Content */}
            <section className="container mx-auto px-6 py-8">
                {posts.map((post, index) => (
                    <div key={index} className="mb-10 border-b-2 pb-10 ">
                        {/* Post Title */}
                        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>

                        {/* Author and Date */}
                        <div className="flex items-center mt-4 mb-5 text-gray-600">
                            <img
                                src={post.author_image || "assets/images/23042919.jpg"}
                                alt="Author"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div className="flex items-center gap-1">
                                <p>
                                    By <strong className="text-lg text-gray-800">{post?.author_name || "Unknown"}</strong> |
                                </p>
                                <span className="text-xs text-gray-800">
                                    posted at
                                    <span className="px-2 py-1 ml-1 text-xs text-gray-800 bg-gray-100 rounded-full">
                                        {post.created_at
                                            ? new Date(post.created_at).toLocaleDateString()
                                            : "Unknown date"}
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Post Image */}
                        {
                            post.image && (<img
                                src={post.image}
                                alt="Post Banner"
                                className="w-full rounded-lg shadow-lg mb-8"
                            />)
                        }


                        {/* Post Content */}
                        <div
                            className="text-gray-700 leading-7"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        ></div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default ReadPost;
