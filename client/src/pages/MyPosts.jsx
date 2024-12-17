import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import PostCard from "../components/PostCard";
import PostNotFound from "../components/PostNotFound";
import axiosApi from "../services/axiosApi";

// Auth Context
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function MyPosts() {
    // check it user's token doesn't exist then redirect to login
    const navigate = useNavigate();
    const { userId, token } = useAuthContext();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    // Notify for an alert
    const notify = (val) => toast(val);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false)

    const fetchingData = async () => {
        try {
            if (!userId) {
                throw new Error("User ID not found in local storage.");
            }

            const response = await axiosApi.get(`/user/blog/all/${userId}`);
            if (response.data.status) {
                setPosts(response.data.blogs); // Set the blogs correctly
            } else if (response.data.status === 404 || response.data.status === false) {
                setNotFound(true)
            }

        } catch (error) {
            console.log(error.message || "An error occurred while fetching posts.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchingData()
    }, []);

    // navigate for update the post
    const handleEditPost = (id) => {
        id && navigate(`/updatepost/${id}`);
    }

    // delete the post
    const handleDeletePost = (postId) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');

        if (confirmDelete) {
            deletePost(postId);
        }
    };

    const deletePost = async (postId) => {
        // Reset previous error states

        try {
            const response = await axiosApi.delete(`/user/blog/delete/${postId}`);

            // Check for successful deletion
            if (response.data && response.data.status === true) {
                // Update posts list by filtering out the deleted post
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
                // Optional: Show success toast/notification
                toast.success('Post deleted successfully');
            } else {
                // Handle specific error scenarios
                switch (response.data.status) {
                    case 404:
                        setNotFound(true);
                        toast.error('Post not found');
                        break;
                    case 403:
                        toast.error('You are not authorized to delete this post');
                        break;
                    default:
                        setError(response.data.message || "Failed to delete post");
                }
            }
        } catch (error) {
            // Handle network or unexpected errors
            setError(error.response?.data?.message || error.message || "An unexpected error occurred");
            toast.error('Failed to delete post');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full h-[90vh]">
                <PageLoader />
            </div>
        )
    }

    if (notFound) {
        return (
            <>
                <Link
                    to="/createnewpost"
                    className="absolute right-3 top-24 px-4 py-2  rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                    Create a Post
                </Link>
                <PostNotFound head="No Post Yet" />
            </>
        );
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
                    <PostCard
                        key={post.id}
                        post={post}
                        onEdit={() => handleEditPost(post.id)}
                        onDelete={() => handleDeletePost(post.id)}
                    />
                ))}

            </div>
        </div >
    );
}

export default MyPosts;