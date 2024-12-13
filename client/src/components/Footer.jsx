import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700">
            <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">About</h2>
                    <p className="text-sm mb-4">
                        Welcome to BlogOrbit, your go-to destination for inspiring and insightful content on technology, lifestyle, travel, and more. We aim to empower our readers with knowledge and ideas that make a difference.
                    </p>
                    <p className="text-sm">
                        <strong>Email:</strong> contact@blogorbit.com <br />
                        <strong>Phone:</strong> +1 234 567 8900
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="/home" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/blog" className="hover:underline">Blog</a></li>
                        <li><a href="/archive" className="hover:underline">Archive</a></li>
                        <li><a href="/author" className="hover:underline">Authors</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Category</h2>
                    <ul className="space-y-2">
                        <li><a href="/category/lifestyle" className="hover:underline">Lifestyle</a></li>
                        <li><a href="/category/technology" className="hover:underline">Technology</a></li>
                        <li><a href="/category/travel" className="hover:underline">Travel</a></li>
                        <li><a href="/category/business" className="hover:underline">Business</a></li>
                        <li><a href="/category/economy" className="hover:underline">Economy</a></li>
                        <li><a href="/category/sports" className="hover:underline">Sports</a></li>
                    </ul>
                </div>

                {/* Newsletter Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Weekly Newsletter</h2>
                    <p className="text-sm mb-4">
                        Subscribe to get the latest articles, updates, and special offers directly in your inbox.
                    </p>
                    <form className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition transform hover:scale-105 duration-300 px-4 py-2"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-gray-100 py-6 border-t-2">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm">
                        <strong>BlogOrbit</strong> © {new Date().getFullYear()}. All Rights Reserved.
                    </p>
                    <ul className="flex space-x-4 text-sm">
                        <li><a href="/terms" className="hover:underline">Terms of Use</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/cookies" className="hover:underline">Cookie Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
