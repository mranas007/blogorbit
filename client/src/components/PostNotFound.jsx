import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostNotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center ">
                <div className="flex justify-center mb-6 w-[100px] h-[100px] mx-auto">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="alertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4f46e5" />
                                <stop offset="100%" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="System" transform="translate(-286.000000, -192.000000)" fillRule="nonzero">
                                <g id="alert_line" transform="translate(286.000000, 192.000000)">
                                    <path
                                        d="M15.3137,2 C15.8441,2 16.3529,2.21071 16.7279,2.58579 L21.4142,7.27208 C21.7893,7.64715 22,8.15586 22,8.68629 L22,15.3137 C22,15.8441 21.7893,16.3529 21.4142,16.7279 L16.7279,21.4142 C16.3528,21.7893 15.8441,22 15.3137,22 L8.68629,22 C8.15586,22 7.64715,21.7893 7.27208,21.4142 L2.58579,16.7279 C2.21071,16.3528 2,15.8441 2,15.3137 L2,8.68629 C2,8.15586 2.21071,7.64715 2.58579,7.27208 L7.27208,2.58579 C7.64715,2.21071 8.15586,2 8.68629,2 L15.3137,2 Z M15.3137,4 L8.68629,4 L4,8.68629 L4,15.3137 L8.68629,20 L15.3137,20 L20,15.3137 L20,8.68629 L15.3137,4 Z M12,15 C12.5523,15 13,15.4477 13,16 C13,16.5523 12.5523,17 12,17 C11.4477,17 11,16.5523 11,16 C11,15.4477 11.4477,15 12,15 Z M12,6 C12.5523,6 13,6.44772 13,7 L13,13 C13,13.5523 12.5523,14 12,14 C11.4477,14 11,13.5523 11,13 L11,7 C11,6.44772 11.4477,6 12,6 Z"
                                        fill="url(#alertGradient)"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>

                </div>

                <h1 className="text-4xl font-bold text-black mb-4 tracking-tight">
                    Post Not Found
                </h1>

                <p className="text-gray-700 mb-6 text-lg">
                    Looks like the page you're searching for has vanished into the digital abyss.
                </p>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-110"
                    >
                        {/* refresh icon svg */}
                        <i class="fa-solid fa-arrows-rotate"></i>

                        <span>Refresh</span>
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostNotFound;