import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ResumeDetails from "./components/ResumeDetails";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resumes/:id" element={<ResumeDetails />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
