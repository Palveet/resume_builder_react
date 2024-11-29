import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axios"
import { useUser } from "./UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid header">
            <h1>Resume Builder</h1>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item" style={{margin:"auto"}}>
                                    <button
                                        className="btn btn-outline-danger nav-link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
