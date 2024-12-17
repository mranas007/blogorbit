import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import ReadPost from "./pages/ReadPost.jsx";
import ReadPostDetails from "./pages/ReadPostDetails.jsx";

// post Crud
import CreatePost from "./pages/PostOperation/CreatePost.jsx";
import PostUpdate from "./pages/PostOperation/UpdatePost.jsx";

// Auth files
import Register from "./Auth/register.jsx";
import Login from "./Auth/login.jsx";

// App 
import LandingPage from "./app/LandingPage.jsx";
import About from "./app/About.jsx";

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = () => {
    const location = useLocation();
    const hideHeaderFooterRoutes = ["/", "/about", "/register", "/login"];
    const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
    return (
        <>
            {!shouldHideHeaderFooter && <Header />}

            <main>
                <Routes>
                    {/* App Start*/}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<About />} />

                    {/* Page */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/readpost" element={<ReadPost />} />
                    <Route path="/myposts" element={<MyPosts />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                    <Route path="/post/:id" element={<ReadPostDetails />} />

                    {/* Post Crud */}
                    <Route path="/createnewpost" element={<CreatePost />} />
                    <Route path="/updatepost/:id" element={<PostUpdate />} />

                    {/* Auth */}
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>

            <ToastContainer />
            {!shouldHideHeaderFooter && <Footer />}
        </>
    )
}

export default router