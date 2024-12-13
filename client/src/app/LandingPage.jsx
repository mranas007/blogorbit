import { React, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Header from '../components/app/Header';
import Footer from '../components/app/Footer';

const LandingPage = () => {
    // check it user's token exist then redirect to home
    const navigate = useNavigate();
    const { token } = useAuthContext();

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);

    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A9.004 9.004 0 0 1 12 21" />
                </svg>
            ),
            title: "Global Perspectives",
            description: "Discover insights from voices around the world, breaking geographical barriers."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
            ),
            title: "Vibrant Community",
            description: "Engage with passionate writers and readers in a dynamic, supportive environment."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            ),
            title: "Effortless Publishing",
            description: "Transform your ideas into compelling stories with our intuitive publishing tools."
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Tech Blogger",
            quote: "BlogOrbit revolutionized how I share my thoughts and connect with readers.",
            avatar: "https://via.placeholder.com/80"
        },
        {
            name: "Michael Chen",
            role: "Travel Writer",
            quote: "The platform's diversity and ease of use are unmatched in the blogging world.",
            avatar: "https://via.placeholder.com/80"
        }
    ];

    return (
        <>
            <Header />
            <div className="bg-gradient-to-br from-gray-50 to-blue-50">

                {/* Hero Section */}
                <div className="relative h-screen pt-24 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
                            Unleash Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Storytelling</span> Potential
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                            BlogOrbit is more than a platform—it's a canvas for your thoughts, a community of passionate creators, and a gateway to global conversations.
                        </p>

                        <div className="flex justify-center gap-4 flex-col md:flex-row">
                            <Link
                                to="/register"
                                className="flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white  transition-all duration-300 transform hover:-translate-y-1">
                                Create Account <span className="ml-2">→</span>
                            </Link>

                            <Link
                                to="/explore"
                                className="relative inline-flex items-center p-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all duration-300 transform hover:-translate-y-1">
                                <span className="flex items-center justify-center px-7 py-2 bg-gradient-to-br from-gray-50 to-blue-50 text-black rounded-full w-full h-full">
                                    Explore Posts <span className="ml-2">⚡</span>
                                </span>
                            </Link>

                        </div>
                    </div>
                </div>

                {/* Feature Cards Section */}
                <div className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Why Choose BlogOrbit?
                            </h2>
                            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                                Discover a platform designed to amplify your voice, connect with readers, and transform your writing journey.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                                >
                                    <div className="flex justify-center mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>

    );
};

export default LandingPage;