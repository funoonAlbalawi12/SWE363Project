import React from "react";
import { useNavigate } from "react-router-dom"; 


function ClubCard({ id ,name, description , img}) {
  const navigate = useNavigate();

  return (
    <div className="club-card">
        <div className="club-image">
        <img src={img} alt={name} />
      </div>
      <div className="club-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <button onClick={() => navigate(`/clubs/${id}`)} className="profile-btn">
          Check Club Profile
        </button>
      </div>
    </div>
  );
}

export default ClubCard;
