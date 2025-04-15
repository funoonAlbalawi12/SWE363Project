import React, { useState } from 'react';
import './SendMessage.css';

function SendMessage() {
  const [members] = useState([
    { id: 1, name: 'Sami AlDossari' },
    { id: 2, name: 'Fatimah AlYami' },
    { id: 3, name: 'Abdullah AlSalem' },
  ]);

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleCheckboxChange = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    if (selectedMembers.length === 0) {
      setConfirmation('⚠️ Please select at least one recipient.');
      return;
    }

    if (message.trim() === '') {
      setConfirmation('⚠️ Message cannot be empty.');
      return;
    }

    // Simulate sending...
    setConfirmation('✅ Message sent successfully!');
    setMessage('');
    setSelectedMembers([]);
  };

  return (
    <div className="send-message-container">
      <h2>Send Message or Notification</h2>

      <div className="member-list">
        <p>Select Recipients:</p>
        {members.map((member) => (
          <label key={member.id} className="checkbox-item">
            <input
              type="checkbox"
              checked={selectedMembers.includes(member.id)}
              onChange={() => handleCheckboxChange(member.id)}
            />
            {member.name}
          </label>
        ))}
      </div>

      <textarea
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button onClick={handleSend}>Send</button>

      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
  );
}

export default SendMessage;
