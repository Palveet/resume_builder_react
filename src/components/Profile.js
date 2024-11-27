import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            });
            setProfileData(response.data);
        };
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSave = async () => {
        await axios.put("http://127.0.0.1:8000/api/profile/", profileData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setEditing(false);
    };

    return (
        <div>
            {editing ? (
                <form>
                    <input type="text" name="name" value={profileData.name} onChange={handleInputChange} />
                    <input type="number" name="age" value={profileData.age} onChange={handleInputChange} />
                    <input type="date" name="dob" value={profileData.dob} onChange={handleInputChange} />
                    <select name="gender" value={profileData.gender} onChange={handleInputChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <button type="button" onClick={handleSave}>Save</button>
                </form>
            ) : (
                <div>
                    <p>Name: {profileData.name}</p>
                    <p>Age: {profileData.age}</p>
                    <p>DOB: {profileData.dob}</p>
                    <p>Gender: {profileData.gender}</p>
                    <button onClick={() => setEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
