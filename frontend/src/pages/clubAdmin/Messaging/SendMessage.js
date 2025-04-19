import React, { useState } from 'react';

function SendMessageForm({ members }) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map((m) => m.id));
    }
    setSelectAll(!selectAll);
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

    setConfirmation(' Message sent successfully!');
    setMessage('');
    setSelectedMembers([]);
    setSelectAll(false);
  };

  return (
    <div className="send-message-container">
      <h2>Send Message or Notification</h2>

      <div className="member-list">
        <p>Select Recipients:</p>
        <label className="checkbox-item">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          Select All
        </label>

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

export default SendMessageForm;
