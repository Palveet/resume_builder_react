import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        name:"",
        password: "",
        age: "",
        dob: "",
        gender: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
            console.log(response)
            setSuccess("User registered successfully! You can now log in.");
            setTimeout(() => navigate("/"), 2000); 
        } catch (response) {
            console.log(response.response.data.error)
            setError(response.response.data.error);
        }
    };

    return (
        <div style={{margin:"auto 20%"}}>
            <h2>Sign Up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit} >
            <div className='controls'>
                    <label htmlFor="username" >
                        Username
                    </label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className='controls'>
                    <label htmlFor="name" >
                        Name
                    </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className='controls'>
                    <label htmlFor="age" >
                        Age
                    </label>
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className='controls'>
                    <label htmlFor="dob" >
                        Birthday
                    </label>
                <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className='controls'>
                    <label htmlFor="gender" >
                        Gender
                    </label>
                <select name="gender" onChange={handleInputChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                </div>
                <div className='controls'>
                    <label htmlFor="email" >
                        Email
                    </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className='controls'>
                    <label htmlFor="password" >
                        Password
                    </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    required
                />
                </div>
                <button type="submit" className='button primary-button'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
