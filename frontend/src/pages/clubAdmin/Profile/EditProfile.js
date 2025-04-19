import React, { useState } from 'react';
import ClubAdminNavbar from '../../../components/ClubAdminNavBar2';
import Footer from '../../../components/Footer';
import './EditProfile.css';

function EditProfile() {
  const [clubName, setClubName] = useState('IEOM KFUPM Chapter');
  const [description, setDescription] = useState('A club focusing on industrial engineering and operations management at KFUPM.');
  const [email, setEmail] = useState('ieom@kfupm.edu.sa');
  const [phone, setPhone] = useState('013-860-1234');
  const [logo, setLogo] = useState(null);
  const [message, setMessage] = useState('');

  const [editField, setEditField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Club details updated successfully!');
    setEditField('');
  };

  const handleEdit = (field) => setEditField(field);

  return (
    <div className="edit-profile-container">
      <ClubAdminNavbar />

      <div className="edit-profile-content">
        <h2>Edit Club Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* Club Logo */}
          <div className="edit-row">
            <label>Club Logo:</label>
            <input type="file" accept="image/png, image/jpeg" onChange={(e) => setLogo(e.target.files[0])} />
          </div>

          {/* Club Name */}
          <div className="edit-row">
            <label>Club Name:</label>
            {editField === 'clubName' ? (
              <input type="text" value={clubName} onChange={(e) => setClubName(e.target.value)} />
            ) : (
              <div className="display-field">
                <span>{clubName}</span>
                <button type="button" onClick={() => handleEdit('clubName')}>Edit</button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="edit-row">
            <label>Description:</label>
            {editField === 'description' ? (
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            ) : (
              <div className="display-field">
                <span>{description}</span>
                <button type="button" onClick={() => handleEdit('description')}>Edit</button>
              </div>
            )}
          </div>

          {/* Email */}
          <div className="edit-row">
            <label>Contact Email:</label>
            {editField === 'email' ? (
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <div className="display-field">
                <span>{email}</span>
                <button type="button" onClick={() => handleEdit('email')}>Edit</button>
              </div>
            )}
          </div>

          {/* Phone */}
          <div className="edit-row">
            <label>Contact Phone:</label>
            {editField === 'phone' ? (
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            ) : (
              <div className="display-field">
                <span>{phone}</span>
                <button type="button" onClick={() => handleEdit('phone')}>Edit</button>
              </div>
            )}
          </div>

          <button type="submit" className="save-button">Save Changes</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EditProfile;
