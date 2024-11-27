import React, { useEffect,useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useNavigate, Link } from "react-router-dom";
import "./index.css";
import AppRoutes from "./routes";
import axiosInstance from "./api/axios";

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token); 
    }, []);

    const handleLogout = async () => {
        const refreshToken = localStorage.getItem("refresh_token");

        try {
            await axiosInstance.post("logout/", { refresh: refreshToken });
        } catch (error) {
            console.error("Error during logout:", error);
        }
        // Clear tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Redirect to login
        navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="header">
            <h1>Resume Builder</h1>
            <Link to="/profile">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
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
