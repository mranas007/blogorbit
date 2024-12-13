import { Route, Routes, useLocation } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import MyPosts from "./pages/MyPosts";
import MyProfile from "./pages/MyProfile";
import CreatePost from "./pages/CreatePost";
import ReadPost from "./pages/ReadPost";
import ReadPostDetails from "./pages/ReadPostDetails";

// Auth files
import Register from "./Auth/register";
import Login from "./Auth/login";

// App paes
import LandingPage from "./app/LandingPage.jsx";
import About from "./app/About.jsx";

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context provider
import { ContextProvider } from "./context/AuthContext.jsx";


function App() {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/", "/about", "/register", "/login"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
  return (
    <>
      <ContextProvider>

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
            <Route path="/createnewpost" element={<CreatePost />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/post/:id" element={<ReadPostDetails />} />

            {/* Auth */}
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        
        <ToastContainer />
        {!shouldHideHeaderFooter && <Footer />}

      </ContextProvider>
    </>
  );
}

export default App;
