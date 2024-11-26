import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ResumeDetails from "./components/ResumeDetails";
import SignUp from "./components/SignUp";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resumes/:id" element={<ResumeDetails />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
