import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import ResumeForm from "./ResumeForm";

const Dashboard = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [editingResume, setEditingResume] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axiosInstance.get("resumes/");
                setResumes(response.data);
            } catch (err) {
                console.error("Error fetching resumes:", err);
            }
        };
        fetchResumes();
    }, []);

    const handleCreateResume = () => {
        setEditingResume(null);
        setIsCreating(true);
    };

    const handleEditResume = (resume) => {
        setEditingResume(resume);
        setIsCreating(false);
    };

    const handleDeleteResume = async (id) => {
        try {
            await axiosInstance.delete(`resumes/${id}/`);
            setResumes(resumes.filter((resume) => resume.id !== id));
        } catch (err) {
            console.error("Error deleting resume:", err);
        }
    };

    const handleDownload = async (id, format) => {
        try {
            const response = await axiosInstance.get(`resumes/${id}/download/${format}/`, {
                responseType: "blob", 
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;

            link.setAttribute("download", `resume.${format}`);
            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
        } catch (err) {
            console.error(`Error downloading resume (${format}):`, err);
        }
    };

    const refreshResumes = async () => {
        const response = await axiosInstance.get("resumes/");
        setResumes(response.data);
        setIsCreating(false);
        setEditingResume(null);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleCreateResume}>Create New Resume</button>
            <ul>
                {resumes.map((resume) => (
                    <li key={resume.id}>
                        <Link to={`/resumes/${resume.id}`}>{resume.title}</Link>
                        <button onClick={() => handleEditResume(resume)}>Edit</button>
                        <button onClick={() => handleDeleteResume(resume.id)}>Delete</button>
                        <button onClick={() => handleDownload(resume.id, "pdf")}>Download PDF</button>
                        <button onClick={() => handleDownload(resume.id, "docx")}>Download DOCX</button>
                    </li>
                ))}
            </ul>
            {(isCreating || editingResume !== null) && (
                <ResumeForm
                    resume={editingResume}
                    isEditing={Boolean(editingResume)}
                    onSuccess={refreshResumes}
                />
            )}
        </div>
    );
};

export default Dashboard;
