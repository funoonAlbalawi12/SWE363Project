import React from "react";
import { useNavigate } from "react-router-dom";
import "./clubpage.css";
import AdminNavbar from "../../../components/AdminNavbar";
import { Plus, Trash2, Pencil } from "lucide-react";
import clubsData from "../../../data/ClubData";

const ClubsPage = () => {
  const navigate = useNavigate();

  const clubs = Object.entries(clubsData).map(([key, club], index) => ({
    id: key,
    title: club.name,
    description: club.description,
    img: club.img,
  }));

  const handleCardClick = (id) => {
    navigate(`/club/${id}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    alert(`Edit club with ID: ${id}`);
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    alert(`Remove club with ID: ${id}`);
  };

  return (
    <div className="clubs-page">
      <AdminNavbar />
      <div className="page-content">
        <div className="greeting">
          <h1>Hello Admin!</h1>
        </div>

        <div className="add-club">
          <button className="add-button">
            <span>Add new club</span>
            <Plus className="icon" />
          </button>
        </div>

        <div className="card-grid">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="club-card clickable"
              onClick={() => handleCardClick(club.id)}
            >
              <div className="card-image">
                {club.img ? (
                  <img
                    src={club.img}
                    alt={club.title}
                    className="club-thumbnail"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <h2>{club.title}</h2>
              <p className="club-description">{club.description}</p>

              <div className="card-actions">
                <button
                  className="btn-ghost-sm"
                  onClick={(e) => handleRemove(e, club.id)}
                >
                  <Trash2 className="icon-sm" />
                  <span>Remove</span>
                </button>
                <button
                  className="btn-ghost-sm"
                  onClick={(e) => handleEdit(e, club.id)}
                >
                  <Pencil className="icon-sm" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>© 2025 KFUPM Activity Network. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClubsPage;
