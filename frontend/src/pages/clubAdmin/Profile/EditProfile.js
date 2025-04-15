import React, { useState } from 'react';
import './EditProfile.css';

function EditProfile() {
  const [clubName, setClubName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clubName || !description) {
      setMessage('Please fill all required fields.');
      return;
    }

    if (logo && !['image/png', 'image/jpeg'].includes(logo.type)) {
      setMessage('Logo must be a PNG or JPEG file.');
      return;
    }

    setMessage('Club details updated successfully!');
  };

  return (
    <div className="edit-club-profile">
      <h2>Edit Club Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Club Logo:</label>
        <input type="file" accept="image/png, image/jpeg" onChange={(e) => setLogo(e.target.files[0])} />

        <label>Club Name *</label>
        <input type="text" value={clubName} onChange={(e) => setClubName(e.target.value)} required />

        <label>Description *</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Contact Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Contact Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <button type="submit">Save Changes</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default EditProfile;
