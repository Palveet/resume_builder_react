import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ResumeDetails from "./components/ResumeDetails";
import SignUp from "./components/SignUp";
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resumes/:id" element={<ResumeDetails />} />
                <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
