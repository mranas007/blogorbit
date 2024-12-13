import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            {/* Footer and other sections remain the same... */}
            <footer className="bg-gray-100 text-gray-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            {/* Logo */}
                            <div className="flex gap-2 mb-2 ">
                                <img src="/assets/svg/blogorbiticon.svg" alt="svg..." className="w-7" />
                                <h1 className="text-xl font-bold text-gray-800">BlogOrbit</h1>
                            </div>
                            <p className="text-gray-600">
                                Empowering voices, connecting minds, one story at a time.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <div className="flex flex-col space-y-2">
                                <Link to="/" className="text-gray-600 hover:text-gray-400">Home</Link>
                                <Link to="/about" className="text-gray-600 hover:text-gray-400">About Us</Link>
                                <Link to="/explore" className="text-gray-600 hover:text-gray-400">Explore</Link>
                                <Link to="/write" className="block text-gray-600 hover:text-gray-400">Write</Link>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-600 hover:text-white">🔒</a>
                                <a href="#" className="text-gray-600 hover:text-white">👥</a>
                                <a href="#" className="text-gray-600 hover:text-white">📡</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} BlogOrbit. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer