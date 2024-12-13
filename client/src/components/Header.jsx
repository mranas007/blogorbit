import { React, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const [isSticky, setIsSticky] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 120) {
            setIsSticky(true);  // Make navbar sticky after scrolling 50px
        } else {
            setIsSticky(false); // Remove sticky when back at the top
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <div className={`h-[75px] ${!isSticky && "hidden"}`}></div>
            <header className={`z-50 bg-white/80 backdrop-blur-md shadow-md min-h-[75px]  ${isSticky ? "fixed top-0 left-0 right-0" : "relative"}
                transition-all duration-300 ease `}>

                <div className={`container mx-auto w-full flex items-center justify-between px-6 py-4 z-50`}>

                    {/* Logo */}
                    <Link to="/home">
                        <div className="flex justify-center items-center gap-2">
                            <img src="/assets/svg/blogorbiticon.svg" alt="svg..." className="w-7" />
                            <h1 className="text-xl font-bold text-gray-800">BlogOrbit</h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex space-x-6">
                        <NavLink
                            to="/home"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? 'text-gray-600 font-bold' : ''}`}>
                            Home
                        </NavLink>

                        <NavLink
                            to="/blog"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? 'text-gray-600 font-bold' : ''}`}>
                            Blog
                        </NavLink>

                        <NavLink
                            to="/readPost"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? 'text-gray-600 font-bold' : ''}`}>
                            Read Posts
                        </NavLink>

                        <NavLink
                            to="/myposts"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? 'text-gray-600 font-bold' : ''}`}>
                            My Posts
                        </NavLink>
                    </nav>

                    {/* Search and Hamburger Menu */}
                    <div className="flex items-center space-x-4">

                        {/* Search Icon (Mobile) */}
                        <button
                            className=" text-gray-600 hover:text-gray-800 focus:outline-none"
                            onClick={() => setSearchOpen(!searchOpen)}>
                            {searchOpen == true ? <i className="fa-solid fa-xmark text-2xl"></i> : <i className="fas fa-search text-xl"></i>}
                        </button>

                        {/* Hamburger Menu Icon */}
                        <button
                            className="md:hidden flex items-center focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="space-y-1">
                                <div className={`w-6 h-0.5 bg-gray-800 transition-transform transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
                                <div className={`w-6 h-0.5 bg-gray-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`}></div>
                                <div className={`w-6 h-0.5 bg-gray-800 transition-transform transform ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`}></div>
                            </div>
                        </button>

                        {/* My Account */}
                        <NavLink
                            to="/myprofile"
                            className="w-10 h-10 rounded-full border border-gray-300 ">
                            <img src={"assets/images/23042919.jpg"} alt="profile..." className="rounded-full object-cover" width="100%" />
                        </NavLink>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {searchOpen && (
                    <div className="z-50 relative bg-white/70 backdrop-blur-md shadow-md">
                        <div className="container mx-auto px-6 py-4 transition-all duration-300 ease">
                            <div className="max-w-[500px] mx-auto flex items-center border border-gray-300 rounded-md">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full p-2 rounded-md focus:outline-none" />
                                <i className="fas fa-magnifying-glass px-2 text-gray-600"></i>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}

                <div className={`${menuOpen && "bg-black/60 right-0"} ${!menuOpen && "left-[-120%]"} absolute top-[74px]  w-full h-screen transition-all duration-300 ease-in-out`}></div>
                <div className={`md:hidden h-screen w-[80%] absolute left-[-120%] top-[74px] ${menuOpen ? "left-[0%]" : "left-[-120%]"} bg-white/80 backdrop-blur-md transition-all duration-300 ease-in-out z-50`}>

                    <nav className="flex flex-col justify-start space-y-4 p-8 text-xl">
                        <NavLink
                            to="/home"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? ' font-bold' : 'text-gray-600'}`}>
                            Home
                        </NavLink>

                        <NavLink
                            to="/blog"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? ' font-bold' : 'text-gray-600'}`}>
                            Blog
                        </NavLink>

                        <NavLink
                            to="/readPost"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? ' font-bold' : 'text-gray-600'}`}>
                            Read Posts
                        </NavLink>

                        <NavLink
                            to="/myposts"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? ' font-bold' : 'text-gray-600'}`}>
                            My Posts
                        </NavLink>

                        <NavLink
                            to="/myprofile"
                            className={({ isActive }) => `text-gray-950 hover:text-gray-800 ${isActive ? ' font-bold' : 'text-gray-600'}`}>
                            My Profile
                        </NavLink>
                    </nav>

                </div>
            </header>

        </>
    );
}

export default Header;
