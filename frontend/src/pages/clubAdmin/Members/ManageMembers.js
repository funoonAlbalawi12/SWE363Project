import React, { useState } from 'react';
import './ManageMembers.css';

function ManageMembers() {
  const [members, setMembers] = useState([
    { id: 1, name: 'Sami AlDossari', role: 'admin' },
    { id: 2, name: 'Fatimah AlYami', role: 'member' },
    { id: 3, name: 'Abdullah AlSalem', role: 'member' },
    { id: 4, name: 'Nouf AlHarbi', role: 'member' },
    { id: 5, name: 'Yousef AlQahtani', role: 'member' },
  ]);

  const handleRemove = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleRoleChange = (id, newRole) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, role: newRole } : member
      )
    );
  };

  return (
    <div className="manage-members-container">
      <h2>Manage Club Members</h2>
      <table className="members-table">
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
                {member.role !== 'admin' ? (
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.id, e.target.value)}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  '—'
                )}
              </td>
              <td>
                <button className="remove-btn" onClick={() => handleRemove(member.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageMembers;
