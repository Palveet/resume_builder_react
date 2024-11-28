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
            console.log(response)
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
                    <div className='controls'>
                    <label htmlFor="username" >
                        Name
                    </label>
                    <input type="text" name="name" value={profileData.name} onChange={handleInputChange} />
                    </div>
                    <div className='controls'>
                    <label htmlFor="age" >
                        Age
                    </label>
                    <input type="number" name="age" value={profileData.age} onChange={handleInputChange} />
                    </div>
                    <div className='controls'>
                    <label htmlFor="dob" >
                        DOB
                    </label>
                    <input type="date" name="dob" value={profileData.dob} onChange={handleInputChange} />
                    </div>
                    <div className='controls'>
                    <label htmlFor="gender" >
                        Gender
                    </label>
                    <select name="gender" value={profileData.gender} onChange={handleInputChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                    <button type="button" onClick={handleSave} className='button primary-button'>Save</button>
                </form>
            ) : (
                <div>
                    <h2>Profile</h2>
                    <p className="p-flex"><div className="black-text">Username:</div> {profileData.username}</p>
                    <p className="p-flex"><div className="black-text">Name:</div> {profileData.name}</p>
                    <p className="p-flex"><div className="black-text">Age:</div> {profileData.age}</p>
                    <p className="p-flex"><div className="black-text">DOB:</div> {profileData.dob}</p>
                    <p className="p-flex"><div className="black-text">Gender:</div> {profileData.gender}</p>
                    <p className="p-flex"><div className="black-text">Email:</div> {profileData.email}</p>
                    <button onClick={() => setEditing(true)} className='button primary-button'>Edit</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
