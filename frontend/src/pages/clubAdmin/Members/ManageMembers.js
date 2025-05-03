import React, { useState, useEffect } from 'react';
import './ManageMembers.css';
import axios from 'axios';

function ManageMembers() {
  const [members, setMembers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const clubName = "IEOM KFUPM Chapter"

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/members?club=${encodeURIComponent(clubName)}`)
      .then((res) => setMembers(res.data))
      .catch((err) => console.error('Error fetching members:', err));
  }, []);

  const handleRemove = (id) => {
    axios
      .delete(`http://localhost:5001/api/members/${id}`)
      .then(() => setMembers((prev) => prev.filter((m) => m._id !== id)))
      .catch((err) => console.error('Delete failed:', err));
  };

  const handleRoleChange = (id, newRole) => {
    axios
      .put(`http://localhost:5001/api/members/${id}`, { role: newRole })
      .then((res) =>
        setMembers((prev) =>
          prev.map((m) => (m._id === id ? res.data : m))
        )
      )
      .catch((err) => console.error('Role update failed:', err));
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
