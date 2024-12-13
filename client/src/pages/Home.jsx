import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import LoadMoreButton from "../components/LoadMoreButton";
import { Link, useNavigate } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import PostNotFound from "../components/PostNotFound";
import axiosApi from "../services/axiosApi";

// Auth Context
import { useAuthContext } from "../context/AuthContext";

function Home() {

    const navigate = useNavigate();
    const { token } = useAuthContext();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axiosApi.get(`/blogs`);
            if (response.status === 200 && response.data.status) {
                setPosts(response.data.blogs);
            } else if (response.status === 404 || !response.data.status) {
                setNotFound(true);
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
        <section className="bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="container mx-auto min-h-screen">
                {posts.slice(0, 1).map((post) => (
                    <Hero key={post.id} post={post} />
                ))}

                <section className="py-12 mt-[140px] md:mt-16">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {posts.slice(1).map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    <Link to="/blog" className="flex justify-center mt-8">
                        <LoadMoreButton text="View All Posts" />
                    </Link>
                </section>
            </div>
        </section>
    );
}

export default Home;
