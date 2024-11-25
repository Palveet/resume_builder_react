import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";

const ResumeForm = ({ resume, onSuccess, isEditing = false }) => {
    const [formData, setFormData] = useState({
        title: resume?.title || "",
        personal_info: resume?.personal_info || {
            name: "",
            email: "",
            phone: "",
        },
        education: resume?.education || [],
        work_experience: resume?.work_experience || [],
        skills: resume?.skills || [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
        
                await axiosInstance.put(`resumes/${resume.id}/`, formData);
            } else {

                await axiosInstance.post("resumes/", formData);
            }

            onSuccess(); 
        } catch (error) {
            console.error("Error saving resume:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="personal_info.name"
                    value={formData.personal_info.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            personal_info: { ...formData.personal_info, name: e.target.value },
                        })
                    }
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="personal_info.email"
                    value={formData.personal_info.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            personal_info: { ...formData.personal_info, email: e.target.value },
                        })
                    }
                    required
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="tel"
                    name="personal_info.phone"
                    value={formData.personal_info.phone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            personal_info: { ...formData.personal_info, phone: e.target.value },
                        })
                    }
                    required
                />
            </div>
            <button type="submit">{isEditing ? "Update Resume" : "Create Resume"}</button>
        </form>
    );
};

export default ResumeForm;
