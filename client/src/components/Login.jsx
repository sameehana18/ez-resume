import React from "react";
import {useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";



function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/v1/users/login", user);
            console.log("login success", response.data);

            navigate("/dashboard");
        } catch (error) {
            console.log("login failed", error);
        } finally {
            setLoading(false);
        }
    };

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
                        className="w-auto h-7 sm:h-8"
                        src="/ez-high-resolution-logo.png"
                        alt=""
                    />
                </div>

                <h3 className="mt-3 text-xl font-medium text-center text-gray-600">
                    Welcome
                </h3>

                <p className="mt-1 text-center text-gray-500 ">
                    Login or create account
                </p>

                <form>
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border rounded-lg focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            placeholder="Email Address"
                            aria-label="Email Address"
                        />
                    </div>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-600 placeholder-gray-500 bg-white border rounded-lg  focus:border-purple-500 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-purple-300"
                            type="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            placeholder="Password"
                            aria-label="Password"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-gray-600  hover:text-gray-500"
                        >
                            Forget Password?
                        </Link>

                        <button
                            onClick={onLogin}
                            className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-700 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300 focus:ring-opacity-50"
                            disabled={buttonDisabled}
                        >
                            Sign In
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
