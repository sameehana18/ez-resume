import React from "react";
import {useEffect, useState } from "react";
import axios from "../config/axiosConfig.js";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../middlewares/AuthContext.jsx";



function Login() {
    const navigate = useNavigate();
    const {login, token} = useAuth();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onLogin = async (e) => {
        e.preventDefault(); 
        try {
            setLoading(true);
            setErrorMessage(""); // Reset error message
            const response = await axios.post("/users/login", user);
            console.log("login success", response.data);

            // Assuming successful login returns a token or user data
            // console.log("response data: ",response.data, "\n");
            // console.log("response data data accessToken: ",response.data.data.accessToken, "\n");
            const accessToken = response.data.data.accessToken;
            
            // console.log("user: ", response.data.data.user);
            const userData = response.data.data.user;
            localStorage.setItem("token", accessToken);
            localStorage.setItem("user", JSON.stringify(userData));
            login(accessToken);
            

            navigate("/dashboard");
        } catch (error) {
            console.log("login failed", error);

            if(error.message && error.response.data){
                setErrorMessage(error.response.data.message || "Login failed. Please check your credentials.");
            }else{
                setErrorMessage("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            navigate("/dashboard");
        }
    }, [token, navigate]);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="my-48 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
            <div className="px-6 py-4">
                <div className="flex justify-center mx-auto">
                    <img
                        className="w-auto h-16 sm:h-20"
                        src="/ezres-logo-removebg-preview.png"
                        alt=""
                    />
                </div>

                <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
                    Welcome
                </h3>

                <p className="mt-1 text-center text-gray-500 ">
                    Login or create account
                </p>

                <form onSubmit={onLogin}>
                    <div className="relative flex items-center mt-4">
                        <span className="absolute left-3">
                            <img
                                src="/icons8-email-96.png"
                                alt="Email Icon"
                                className="w-6 h-6 mt-2 mr-1"
                            />
                        </span>
                        <input
                            className="block w-full px-10 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border rounded-lg focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            placeholder="Email Address"
                            aria-label="Email Address"
                        />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute left-3">
                            <img
                                src="/icons8-password3-96.png"
                                alt="Password Icon"
                                className="w-6 h-6 mt-2 mr-1"
                            />
                        </span>
                        <input
                            className="block w-full px-10 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border rounded-lg focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            type="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            placeholder="Password"
                            aria-label="Password"
                        />
                    </div>

                    {errorMessage && (
                        <p className="mt-2 text-red-600 text-sm">{errorMessage}</p>
                    )}

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-gray-600 hover:text-gray-500"
                        >
                            Forget Password?
                        </Link>

                        <button
                            type="submit" // Ensure this is a submit button
                            className={`px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-700 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={buttonDisabled || loading} // Disable if loading or button is disabled
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex items-center justify-center py-4 text-center bg-gray-100 ">
                <span className="text-sm text-gray-700">
                    Don't have an account?{" "}
                </span>
                <Link
                    to="/signup"
                    className="mx-2 text-sm font-bold text-purple-700 hover:underline"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;
