import React, { useEffect, useState } from "react";
import "./Profile.css";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import API from "../../../axios";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    city: "",
    state: "",
  });
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/api/users/${userId}`);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          address: res.data.address || "",
          phone: res.data.phone || "",
          city: res.data.city || "",
          state: res.data.state || "",
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load profile.");
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await API.put(`/api/users/${userId}`, formData);
      navigate(-1);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="modal-overlay">
      <div className="profile-page">
        <h1>Edit Profile</h1>

        <div className="profile-form">
          <div className="profile-avatar">
            <FiUser />
          </div>

          <div className="form-fields">
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-group">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
