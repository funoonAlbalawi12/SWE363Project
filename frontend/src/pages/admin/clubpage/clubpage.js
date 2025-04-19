import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./clubpage.css";
import AdminNavbar from "../../../components/AdminNavbar";
import { Plus, Trash2, Pencil } from "lucide-react";
import clubsData from "../../../data/ClubData";
import Footer from "../../../components/Footer";

const ClubsPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    description: "",
  });

  const clubs = Object.entries(clubsData).map(([key, club]) => ({
    id: key,
    title: club.name,
    description: club.description,
    img: club.img,
  }));

  const handleCardClick = (id) => navigate(`/club/${id}`);

  const handleEdit = (e, id) => {
    e.stopPropagation();
    alert(`Edit club with ID: ${id}`);
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    alert(`Remove club with ID: ${id}`);
  };

  const toggleForm = () => setShowForm(!showForm);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Club submitted:", formData);
    setFormData({ name: "", img: null, description: "" });
    setShowForm(false);
  };

  return (
    <div className="clubs-page">
      <AdminNavbar />
      <div className="page-content">
        <div className="greeting">
          <h1>Hello Khulud!</h1>
        </div>

        <div className="add-club">
          <button className="add-button" onClick={toggleForm}>
            <span>Add new club</span>
            <Plus className="icon" />
          </button>
        </div>

        {showForm && (
          <div className="event-form-overlay">
            <form className="event-form" onSubmit={handleSubmit}>
              <h2>Add Club</h2>
              <label>Club Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={handleFormChange}
              />

              <label>Club Logo</label>
              <input
                type="file"
                accept="image/*"
                name="img"
                onChange={handleFormChange}
              />

              <label>Description</label>
              <textarea
                name="description"
                required
                rows="4"
                onChange={handleFormChange}
              />

              <div className="form-actions">
                <button type="submit" className="login-btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="login-btn"
                  onClick={toggleForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

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
      <Footer />
    </div>
  );
};

export default ClubsPage;
