import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";

const ResumeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axiosInstance.get(`resumes/${id}/`);
                setResume(response.data);
            } catch (err) {
                setError("Error fetching resume details.");
            }
        };
        fetchResume();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!resume) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h1>{resume.title}</h1>

            <h2>Resume Details</h2>
            <div dangerouslySetInnerHTML={{ __html: resume.resume_content }} />
        </div>
    );
};

export default ResumeDetails;
