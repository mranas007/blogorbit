import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import PostNotFound from "../components/PostNotFound";
import axiosApi from "../services/axiosApi";

// Auth Context
import { useAuthContext } from "../context/AuthContext";

function ReadPostDetails() {
    // check it user's token doesn't exist then redirect to login
    const navigate = useNavigate();
    const { token } = useAuthContext();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const params = useParams(); // recives the id
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {

            const response = await axiosApi.get(`/blog/user/${params.id}`);
            if (response.data.status && response.data.blog.length > 0) {
                // Take the first blog post from the array
                setPost(response.data.blog[0]);
            }
        } catch (error) {
            console.error("Error fetching post details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]);

    if (loading) {
        return <PageLoader />
    }

    if (!post) {
        return <PostNotFound />
    }

    return (

        <div className="container min-h-screen mx-auto px-4 py-8">

            <div className="my-8 flex justify-end">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <span className="text-xl leading-none">&larr;</span>
                    <span>Go Back</span>
                </button>
            </div>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{post?.title || "Untitled"}</h1>
                {/* Author */}
                <div className="flex items-center text-gray-500 mb-4 mt-1 text-sm">
                    {/* {post.author_image && ( */}
                    <img
                        src={post.author_image || "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
                        alt="Author"
                        className="w-8 h-8 rounded-full mr-1"
                    />
                    {/* )} */}
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

            {post?.image && (
                <div className="mb-6">
                    <img
                        src={post.image}
                        alt="Post visual"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            )}

            <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
            >
            </div>
        </div>
    );
}

export default ReadPostDetails;