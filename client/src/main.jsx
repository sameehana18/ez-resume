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
    Navigate,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import { AuthProvider } from "./middlewares/AuthContext.jsx";
import ProtectedRoute from "./middlewares/ProtectedRoute.jsx";
import AuthLayout from "./middlewares/AuthLayout.jsx";
import Settings from "./components/Settings.jsx";
import EditResume from "./components/EditResume.jsx";
import PageNotFound from "./components/PageNotFound.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<App />}
        >
            <Route element={<AuthLayout />}>
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
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    {/* Nested route for editing a resume */}
                    <Route
                        path="resume/:resumeId/edit"
                        element={
                            <ProtectedRoute>
                                <EditResume />
                            </ProtectedRoute>
                        }
                    />
                </Route>
                <Route
                    path="settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="forgot-password"
                    element={<ForgotPassword />}
                />
                {/* Redirect root path to /home */}
                <Route
                    index
                    element={
                        <Navigate
                            to="/home"
                            replace
                        />
                    }
                />
                <Route
                    path="*"
                    element={<PageNotFound />}
                />
            </Route>
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
