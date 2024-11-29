import './App.css';
import "react-quill/dist/quill.snow.css";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import ResumeDetails from "./components/ResumeDetails";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
    <Router>
      <div className='App'>
        <Header/>
        <Routes>
        <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/resumes/:id" element={<ResumeDetails />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
