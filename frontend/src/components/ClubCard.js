import React from "react";
import { Link } from "react-router-dom";

function ClubCard({ name, description, img }) {
  return (
    <Link
      to={`/clubs/${name.toLowerCase().replace(/\s+/g, "-")}`}
      className="custom-club-card-link"
    >
      <div className="custom-club-card">
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
