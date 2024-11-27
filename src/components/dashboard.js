import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import ResumeForm from "./ResumeForm";
import { ReactComponent as Edit } from '../assets/Edit.svg';
import { ReactComponent as Delete } from '../assets/delete.svg';
import { ReactComponent as Download } from '../assets/Download.svg';

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
        <div className="dashboard">
            <h1 className="dashboard-title">Dashboard</h1>
            <button className="create-resume-button" onClick={handleCreateResume}>
                Create New Resume
            </button>
            <ul className="resume-list">
                {resumes.map((resume) => (
                    <li key={resume.id} className="resume-item">
                        <div className="resume-info">
                            <Link to={`/resumes/${resume.id}`} className="resume-title">
                                {resume.title}
                            </Link>
                            <div className="resume-actions">
                                <button
                                    className="action-button edit-button"
                                    onClick={() => handleEditResume(resume)}
                                    title="Edit Resume"
                                >
                                    <Edit style={{ width: '16px', height: '16px' }} />
                                </button>
                                <button
                                    className="action-button delete-button"
                                    onClick={() => handleDeleteResume(resume.id)}
                                    title="Delete Resume"
                                >
                                    <Delete style={{ width: '16px', height: '16px' }} />
                                </button>
                                <button
                                    className="action-button download-button"
                                    onClick={() => handleDownload(resume.id, "pdf")}
                                    title="Download PDF"
                                >
                                    <Download style={{ width: '16px', height: '16px' }} />
                                    PDF
                                </button>
                                <button
                                    className="action-button download-button"
                                    onClick={() => handleDownload(resume.id, "docx")}
                                    title="Download DOCX"
                                >
                                    <Download style={{ width: '16px', height: '16px' }} />
                                    DOCX
                                </button>
                            </div>
                        </div>
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
