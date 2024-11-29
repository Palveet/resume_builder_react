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
        personal_info: {
            name: resume?.personal_info?.name || "",
            email: resume?.personal_info?.email || "",
            phone: resume?.personal_info?.phone || "",
        },
        education: resume?.education || "",
        work_experience: resume?.work_experience || "",
        skills: resume?.skills || "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("personal_info.")) {
            const field = name.split(".")[1];
            setFormData((prevData) => ({
                ...prevData,
                personal_info: { ...prevData.personal_info, [field]: value },
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
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

    const handleDownloadPDF = () => {
        if (isEditing && resume.id) {
            const pdfUrl = `http://127.0.0.1:8000/api/resumes/${resume.id}/download/pdf/`;
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.setAttribute("download", `${formData.title || "resume"}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } else {
            console.warn("Download is only available for saved resumes.");
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
                <div className='controls'>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="personal_info.name"
                        value={formData.personal_info.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='controls'>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="personal_info.email"
                        value={formData.personal_info.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='controls'>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="personal_info.phone"
                        value={formData.personal_info.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* <div className='textbox-controls'>
                    <label>Education:</label>
                    <ReactQuill
                        theme="snow"
                        value={formData.education}
                        onChange={(value) => handleQuillChange("education", value)}
                        placeholder="Enter your education details here..."
                    />
                </div> */}
                <div className='textbox-controls'>
                    <label>Work Experience:</label>
                    <ReactQuill
                        theme="snow"
                        value={formData.work_experience}
                        onChange={(value) => handleQuillChange("work_experience", value)}
                        placeholder="Enter your work experience here..."
                        formats={formats}
                        modules={modules}
                    />
                </div>
                {/* <div className='textbox-controls'>
                    <label>Skills:</label>
                    <ReactQuill
                        theme="snow"
                        value={formData.skills}
                        onChange={(value) => handleQuillChange("skills", value)}
                        placeholder="Enter your skills here..."
                    />
                </div> */}
                <button type="submit" className="primary-button button">{isEditing ? "Update Resume" : "Submit"}</button>
            </form>

            <div style={{ marginTop: "20px" }}>
                <button className="action-button download-button" onClick={handleDownloadPDF}>
                <Download style={{ width: '16px', height: '16px' }} />
                 PDF</button>
            </div>
        </div>
    );
};

export default ResumeForm;
