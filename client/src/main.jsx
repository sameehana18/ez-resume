import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Navigate, // Import Navigate
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<App />}
        >
            <Route
                path="home"
                element={<Home />}
            />
            <Route
                path="login"
                element={<Login />}
            />
            <Route
                path="signup"
                element={<Signup />}
            />
            <Route
                path="dashboard"
                element={<Dashboard />}
            />
            <Route
                path="forgot-password"
                element={<ForgotPassword />}
            />
            {/* Redirect root path to /home */}
            <Route
                path="/"
                element={
                    <Navigate
                        to="/home"
                        replace
                    />
                }
            />
            <Route
                path="*"
                element={<div>404 Not Found</div>}
            />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
