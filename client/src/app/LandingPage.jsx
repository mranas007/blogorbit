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
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 466.337 466.337" className="h-12 w-12 text-blue-600" fill="currentColor" stroke="none" >
                    <g>
                        <path d="M233.168,0C104.604,0,0,104.604,0,233.168c0,128.565,104.604,233.169,233.168,233.169 c128.565,0,233.169-104.604,233.169-233.169C466.337,104.604,361.733,0,233.168,0z M223.984,441.874 c-22.321,0-46.405-41.384-59.045-107.815h118.067C270.371,400.49,246.316,441.874,223.984,441.874z M161.114,310.144 c-2.738-19.991-4.437-41.781-4.881-65.018H291.74c-0.443,23.237-2.148,45.027-4.869,65.018H161.114z M24.521,245.126h107.704 c0.443,21.883,2.09,43.859,4.887,65.018H38.768C30.693,289.826,25.818,267.966,24.521,245.126z M223.984,24.464 c21.982,0,45.687,40.14,58.484,104.877h-116.97C178.286,64.604,201.996,24.464,223.984,24.464z M286.463,153.245 c2.978,20.785,4.811,43.596,5.277,67.966H156.222c0.467-24.37,2.295-47.169,5.272-67.966H286.463z M132.226,221.211H24.521 c1.354-23.926,6.568-46.836,15.332-67.966h97.656C134.462,175.32,132.681,198.312,132.226,221.211z M315.749,245.126h126.065 c-1.296,22.84-6.188,44.7-14.246,65.018H310.855C313.646,288.985,315.305,267.009,315.749,245.126z M315.749,221.211 c-0.468-22.898-2.254-45.891-5.29-67.966h116.023c8.77,21.13,13.978,44.04,15.332,67.966H315.749z M414.596,129.33H306.617 c-7.894-42.067-20.727-78.844-38.195-102.222C330.952,37.799,384.06,76.205,414.596,129.33z M176.073,32.036 c-15.7,23.459-27.348,58.1-34.699,97.305H51.741C78.657,82.505,123.064,47.1,176.073,32.036z M49.96,334.058h90.895 c7.311,40.403,19.133,76.205,35.219,100.26C121.944,418.904,76.672,382.378,49.96,334.058z M268.41,439.222 c17.865-23.938,30.874-61.889,38.697-105.164h109.274C386.15,388.743,332.12,428.339,268.41,439.222z" />
                    </g>
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