import React from "react";
import { useNavigate } from "react-router-dom";
import "./clubpage.css";
import AdminNavbar2 from "../../../components/AdminNavbar";


import { Plus, Bell, Trash2, Pencil } from "lucide-react";

const ClubsPage = () => {
  const navigate = useNavigate();

  const clubs = [
    { id: 1, title: "IEOM KFUPM CHAPTER", description: "Description 1" },
    { id: 2, title: "Coding Club", description: "Description 2" },
    { id: 3, title: "Tech Club", description: "Description 3" },
    { id: 4, title: "AI Club", description: "Description 4" },
    { id: 5, title: "Innovation Club", description: "Description 5" },
    { id: 6, title: "Robotics Club", description: "Description 6" },
  ];

  const handleCardClick = (id) => {
    navigate(`/club/${id}`); // <-- تم تعديل الصيغة
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    alert(`Edit club with ID: ${id}`); // <-- تم تعديل الصيغة
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    alert(`Remove club with ID: ${id}`); // <-- تم تعديل الصيغة
  };

  return (
    <div className="clubs-page">
      {/* Admin Navigation */}
      <AdminNavbar2 />

      {/* Greeting */}
      <div className="greeting">
        <h1>Hello Admin!</h1>
      </div>

      {/* Add New Club */}
      <div className="add-club">
        <button className="add-button">
          <span>Add new club</span>
          <Plus className="icon" />
        </button>
      </div>

      {/* Club Cards */}
      <div className="card-grid">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="club-card clickable"
            onClick={() => handleCardClick(club.id)}
          >
            <div className="card-image">Image</div>
            <h2>{club.title}</h2>
            <div className="placeholder-line short" />
            <div className="placeholder-line shorter" />

            {/* Admin Options */}
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

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 KFUPM Activity Network. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ClubsPage;
