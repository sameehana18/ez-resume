import React from "react";
import { useOutlet } from "react-router-dom";
import { AuthProvider } from "./AuthContext.jsx";


const AuthLayout = () => {
    const outlet = useOutlet();

    return(
        <AuthProvider>
            {outlet}
        </AuthProvider>
    )
}

export default AuthLayout;