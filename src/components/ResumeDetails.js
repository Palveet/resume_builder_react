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
            <h2>Personal Info</h2>
            <p>Name: {resume.personal_info.name}</p>
            <p>Email: {resume.personal_info.email}</p>
            <p>Phone: {resume.personal_info.phone}</p>
            <h2>Education</h2>
            <ul>
                {resume.education.map((edu, index) => (
                    <li key={index}>
                        {edu.institution} - {edu.degree} ({edu.year})
                    </li>
                ))}
            </ul>
            <h2>Work Experience</h2>
            <ul>
                {resume.work_experience.map((work, index) => (
                    <li key={index}>
                        {work.company}: {work.role} ({work.years})
                    </li>
                ))}
            </ul>
            <h2>Skills</h2>
            <ul>
                {resume.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
};

export default ResumeDetails;