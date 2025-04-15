import React, { useState } from 'react';
import './ManageMembers.css';

function ManageMembers() {
  const currentAdminId = 1; // Simulating the logged-in admin ID

  const [members, setMembers] = useState([
    { id: 1, name: 'Sami AlDossari', role: 'Admin' },
    { id: 2, name: 'Fatimah AlYami', role: 'Member' },
    { id: 3, name: 'Abdullah AlSalem', role: 'Member' },
  ]);

  const [message, setMessage] = useState('');

  const handleRemove = (id) => {
    if (id === currentAdminId) {
      setMessage('⚠️ You cannot remove yourself from the club.');
      return;
    }

    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
    setMessage('✅ Member removed successfully.');
  };

  const handleRoleChange = (id, newRole) => {
    const updated = members.map((member) =>
      member.id === id ? { ...member, role: newRole } : member
    );
    setMembers(updated);
    setMessage('✅ Role updated.');
  };

  return (
    <div className="manage-members-container">
      <h2>Manage Club Members</h2>

      {message && <p className="message">{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>
                {member.id !== currentAdminId && (
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>
                )}
                {member.id === currentAdminId && <span>—</span>}
              </td>
              <td>
                {member.id !== currentAdminId ? (
                  <button className="remove-btn" onClick={() => handleRemove(member.id)}>
                    Remove
                  </button>
                ) : (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageMembers;
