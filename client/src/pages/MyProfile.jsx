import { React, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Auth Context
import { useAuthContext } from '../context/AuthContext';

const BlogAuthorProfile = () => {
  // check it user's token doesn't exist then redirect to login
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="max-w-4xl min-h-screen mx-auto md:my-5 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Profile Section */}
          <div className="md:w-1/3 bg-gray-100 p-6 flex flex-col items-center">
            <img
              src="assets/images/23042919.jpg"
              alt="Author"
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Alex Rodriguez</h2>
            <p className="text-gray-600 text-center mb-4">Technical Writer & Frontend Developer</p>
            <div className="flex space-x-4 text-gray-600">

              <a href="#" className="hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
                </svg>
              </a>

              <a href="#" className="hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.042c.897-1.645 4-1.777 4 1.645v3.313z" />
                </svg>
              </a>

              <a href="#" className="hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.542 2.889 5.925 3.01-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.367 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489v.385z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-2/3 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">About Me</h3>
            <p className="text-gray-600 mb-6">
              I'm a passionate technical writer and frontend developer with a deep love for creating
              clean, efficient web experiences. My blog explores the intersection of design,
              technology, and user-centric solutions. I enjoy breaking down complex technical
              concepts into digestible, engaging content.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Blog Stats</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">42</div>
                <div className="text-gray-600">Posts</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-600">15K</div>
                <div className="text-gray-600">Readers</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">87</div>
                <div className="text-gray-600">Comments</div>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-105 duration-300">
                View My Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogAuthorProfile;