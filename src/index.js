import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes";
import axiosInstance from "./api/axios";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("access_token");
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();

        // Optional: Add an event listener to detect token changes in localStorage
        const handleStorageChange = () => {
            checkLoginStatus();
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem("refresh_token");
        try {
            if (refreshToken) {
                await axiosInstance.post("logout/", { refresh: refreshToken });
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }

        // Clear tokens and update state
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
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


const App = () => (
    <Router>
        <Header />
        <AppRoutes />
    </Router>
);

ReactDOM.render(<App />, document.getElementById("root"));
