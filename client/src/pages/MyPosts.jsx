import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import PostCard from "../components/PostCard";
import PostNotFound from "../components/PostNotFound";
import axiosApi from "../services/axiosApi";

// Auth Context
import { useAuthContext } from "../context/AuthContext";

function MyPosts() {
    // check it user's token doesn't exist then redirect to login
    const navigate = useNavigate();
    const { userId, token } = useAuthContext();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false)

    const fetchingData = async () => {
        try {
            if (!userId) {
                throw new Error("User ID not found in local storage.");
            }

            const response = await axiosApi.get(`/blogs/user/${userId}`);
            if (response.data.status) {
                setPosts(response.data.blogs); // Set the blogs correctly
            } else if (response.data.status === 404 || response.data.status === false) {
                setNotFound(true)
            }

        } catch (error) {
            setError(error.message || "An error occurred while fetching posts.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchingData()
    }, []);


    if (loading) {
        return (
            <div className="w-full h-[90vh]">
                <PageLoader />
            </div>
        )
    }

    if (notFound) {
        return <PostNotFound />;
    }

    return (
        <div className="container min-h-screen mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-3">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Posts</h1>
                <Link
                    to="/createnewpost"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition transform duration-300"
                >
                    Create a Post
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}

            </div>
        </div >
    );
}

export default MyPosts;