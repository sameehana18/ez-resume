import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


const ProtectedRoute = ({ children }) => {
    const {token} = useAuth();
    // console.log("token from ProtectedRoute: ", token);

    if(!token){
        return <Navigate to="/login" replace/>
    }

    return children;
}

export default ProtectedRoute;