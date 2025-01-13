import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Import required hooks
import axios from "../config/axiosConfig.js";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation(); // Get the current path
    const [user, setUser] = useState(null);

    const onLogout = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // Get token from localStorage
            if (!token) {
                console.log("No token found");
                return; // Optionally handle the case where the token doesn't exist
            }
    
            const response = await axios.post("/users/logout", null, {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in Authorization header
                },
            });
            console.log("Logout success:", response.data);
    
            // Clear the token and redirect
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/home");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUser(userData);
        }
    }, []);

    return (
        <nav className="relative bg-white shadow">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <a href="#">
                            <img
                                className="w-auto h-10 sm:h-12"
                                src="/ezres-navbar-removebg-preview.png"
                                alt=""
                            />
                        </a>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-gray-500 hover:text-gray-600 focus:outline-none"
                                aria-label="toggle menu"
                            >
                                {!isOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 8h16M4 16h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white ${
                            isOpen
                                ? "translate-x-0 opacity-100"
                                : "opacity-0 -translate-x-full"
                        } lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}
                    >
                        {location.pathname === "/home" ? (
                            <div className="flex items-center mt-4 lg:mt-0">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-500"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 ml-4 text-sm font-medium text-purple-700 border border-purple-700 rounded-lg hover:bg-purple-50"
                                >
                                    Signup
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center mt-4 lg:mt-0 relative">
                                {/* Profile Button */}
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center focus:outline-none"
                                    aria-label="toggle profile dropdown"
                                >
                                    <div className="w-8 h-8 overflow-hidden border border-gray-400 rounded-full">
                                        <img
                                            src="/icons8-user-96.png"
                                            className="object-cover w-full h-full"
                                            alt="avatar"
                                        />
                                    </div>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                                        {/* Display Username */}
                                        <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-200">
                                            {user ? user.fullname : "Loading..."}
                                        </div>
                                        <a
                                            href="/settings"
                                            className="relative flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <span className="absolute left-3">
                                                <img
                                                    src="/icons8-settings-96.png"
                                                    alt="Settings Icon"
                                                    className="w-5 h-5"
                                                />
                                            </span>
                                            <span className="ml-8">Settings</span>
                                        </a>
                                        <a
                                            href="#"
                                            onClick={onLogout}
                                            className="relative flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <span className="absolute left-3">
                                                <img
                                                    src="/icons8-logout-100.png"
                                                    alt="Logout Icon"
                                                    className="w-5 h-5"
                                                />
                                            </span>
                                            <span className="ml-8">Logout</span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
