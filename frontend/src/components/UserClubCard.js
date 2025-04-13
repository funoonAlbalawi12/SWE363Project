import React from "react";

function UserClubCard({ name, role }) {
  return (
    <div className="user-club-card">
      <h4 className="user-club-name">{name}</h4>
      <p className="user-club-role">{role}</p>
    </div>
  );
}

export default UserClubCard;
