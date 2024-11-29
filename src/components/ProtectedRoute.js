import React from "react";
import { Navigate } from "react-router-dom";

import {jwtDecode} from "jwt-decode";

const isTokenValid = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp > Date.now() / 1000;
    } catch (e) {
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");

    if (!token || !isTokenValid(token)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
