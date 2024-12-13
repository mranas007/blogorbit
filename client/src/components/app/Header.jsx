import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Function to determine if a link is active
    const isActive = (path) => {
        return location.pathname === path 
            ? "text-indigo-600 font-bold" 
            : "text-gray-700 hover:text-indigo-600";
    };

    // Close mobile menu when a link is clicked
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo with hover effect */}
                    <Link to="/" className="flex justify-center items-center gap-2 group">
                        <img 
                            src="/assets/svg/blogorbiticon.svg" 
                            alt="BlogOrbit Logo" 
                            className="w-7 transition-transform group-hover:scale-110" 
                        />
                        <h1 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
                            BlogOrbit
                        </h1>
                    </Link>

                    {/* Hamburger Menu Icon - Original Implementation */}
                    <button
                        className="md:hidden flex items-center focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="space-y-1">
                            <div className={`w-6 h-0.5 bg-gray-800 transition-transform transform ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
                            <div className={`w-6 h-0.5 bg-gray-800 transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}></div>
                            <div className={`w-6 h-0.5 bg-gray-800 transition-transform transform ${isMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}></div>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link 
                            to="/" 
                            className={`${isActive("/")} transition`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            className={`${isActive("/about")} transition`}
                        >
                            About Us
                        </Link>
                        <Link 
                            to="/explore" 
                            className={`${isActive("/explore")} transition`}
                        >
                            Explore
                        </Link>
                        <Link 
                            to="/write" 
                            className={`${isActive("/write")} transition`}
                        >
                            Write
                        </Link>
                        <Link 
                            to="/login" 
                            className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        >
                            Login
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu with Smooth Transition */}
                <div 
                    className={`md:hidden absolute left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out transform 
                        ${isMenuOpen 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 -translate-y-full'
                        }`}
                    style={{
                        visibility: isMenuOpen ? 'visible' : 'hidden',
                        pointerEvents: isMenuOpen ? 'auto' : 'none'
                    }}
                >
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        <Link 
                            to="/" 
                            className={`block py-2 ${isActive("/")} hover:bg-indigo-50 rounded-md`}
                            onClick={handleLinkClick}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            className={`block py-2 ${isActive("/about")} hover:bg-indigo-50 rounded-md`}
                            onClick={handleLinkClick}
                        >
                            About Us
                        </Link>
                        <Link 
                            to="/explore" 
                            className={`block py-2 ${isActive("/explore")} hover:bg-indigo-50 rounded-md`}
                            onClick={handleLinkClick}
                        >
                            Explore
                        </Link>
                        <Link 
                            to="/write" 
                            className={`block py-2 ${isActive("/write")} hover:bg-indigo-50 rounded-md`}
                            onClick={handleLinkClick}
                        >
                            Write
                        </Link>
                        <Link
                            to="/login"
                            className="block w-full text-center py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-600 transition"
                            onClick={handleLinkClick}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;