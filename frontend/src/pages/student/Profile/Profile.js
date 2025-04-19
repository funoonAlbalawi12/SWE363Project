import React, { useState } from "react";
import "./Profile.css";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "Khulud",
    lastName: "Alotaibi",
    email: "khulud@gmail.com",
    address: "",
    phone: "",
    city: "",
    state: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", formData);
    navigate(-1);
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
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
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
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

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
