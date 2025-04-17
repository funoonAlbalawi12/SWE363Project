import React from "react";
import { Link } from "react-router-dom";

function ClubCard({ id, name, description, img }) {
  return (
    <Link to={`/clubs/${id}`} className="club-card-link">
      <div className="club-card">
        <div className="club-image">
          <img src={img} alt={name} />
        </div>
        <div className="club-info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ClubCard;
