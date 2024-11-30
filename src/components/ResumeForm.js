import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ReactComponent as Download} from '../assets/Download.svg';

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["arial", "times-new-roman", "courier", "comic-sans", "georgia", "impact"];
ReactQuill.Quill.register(Font, true);

const modules = {
    toolbar: [
        [{ font: Font.whitelist }], 
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"], 
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: 'center' }, { align: 'right' },{ align: 'justify' }],
        ["clean"],
    ],
};

const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "align",
];
const ResumeForm = ({ resume = {}, onSuccess, isEditing = false }) => {
    const [formData, setFormData] = useState({
        title: resume?.title || "",
        resume_content: resume?.resume_content || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleQuillChange = (field, value) => {
        if (formData[field] !== value) {
            setFormData((prevData) => ({ ...prevData, [field]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing && resume.id) {
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
        <div>
            <form onSubmit={handleSubmit}>
                <div className='controls'>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='textbox-controls'>
                    <label>Resume Details</label>
                    <ReactQuill
                        theme="snow"
                        value={formData.resume_content}
                        onChange={(value) => handleQuillChange("resume_content", value)}
                        placeholder="Enter your work experience here..."
                        formats={formats}
                        modules={modules}
                    />
                </div>
                <button type="submit" className="primary-button button">{isEditing ? "Update Resume" : "Submit"}</button>
            </form>
        </div>
    );
};

export default ResumeForm;
