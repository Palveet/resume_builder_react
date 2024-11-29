import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios"
import { useUser } from "./UserContext";
export const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setUser } = useUser();

    const checkLoginStatus = () => {
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token);
    };

    useEffect(() => {

        checkLoginStatus();

        const handleStorageChange = () => {
            checkLoginStatus();
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [checkLoginStatus,isLoggedIn]);

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        try {
            if (refreshToken) {
                await axiosInstance.post("logout/", { refresh: refreshToken });
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
    };

    return (
        <div className="header">
            <h1>Resume Builder</h1>
            {isLoggedIn && (
                <div className="header-actions">
                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>
                    <Link to="/dashboard" className="profile-link">
                        Dashboard
                    </Link>
                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};
export default Header;