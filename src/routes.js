import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import ResumeDetails from "./components/ResumeDetails";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/resumes/:id" element={<ResumeDetails />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
    );
};

export default AppRoutes;
