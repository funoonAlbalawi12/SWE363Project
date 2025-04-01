import React from "react";

function ClubCard({ name, role }) {
  return (
    <div className="club-card">
      <h4 className="club-name">{name}</h4>
      <p className="club-role">{role}</p>
    </div>
  );
}

export default ClubCard;
