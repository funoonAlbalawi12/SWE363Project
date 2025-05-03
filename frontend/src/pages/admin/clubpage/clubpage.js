import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const [clubs, setClubs] = useState([]);

  // Fetch all clubs when the component mounts
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/clubs");
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  // Handle form changes for creating a new club
  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("image", formData.img);

      const response = await axios.post("http://localhost:5001/api/clubs", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Club created:", response.data);
      setClubs([...clubs, response.data]); // Add the new club to the clubs list
      setFormData({ name: "", img: null, description: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating club:", error);
    }
  };

  // Function to handle the removal of a club
  const handleRemove = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this club?");
    if (!confirmed) return;
  
    try {
      const response = await axios.delete(`http://localhost:5001/api/clubs/${id}`);
      console.log("Club removed:", response.data);
      setClubs(clubs.filter(club => club._id !== id));
    } catch (error) {
      console.error("Error removing club:", error);
    }
  };
  

  // Function to handle the editing of a club
  const handleEdit = (id) => {
    console.log(`Edit club with ID: ${id}`);
    // Navigate to the edit page or show an edit form if you have one
    navigate(`/edit-club/${id}`);
  };

  return (
    <div className="clubs-page">
      <AdminNavbar />
      <div className="page-content">
        <div className="greeting">
          <h1>Hello Admin!</h1>
        </div>

        <div className="add-club">
          <button className="add-button" onClick={() => setShowForm(!showForm)}>
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
                value={formData.name}
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
                value={formData.description}
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
                  onClick={() => setShowForm(false)}
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
              key={club._id}
              className="club-card clickable"
              onClick={() => navigate(`/club/${club._id}`)}
            >
              <div className="card-image">
                {club.image ? (
                  <img
                    src={`http://localhost:5001/${club.image}`} // Assuming your backend serves the image files
                    alt={club.name}
                    className="club-thumbnail"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <h2>{club.name}</h2>
              <p className="club-description">{club.description}</p>

              <div className="card-actions">
                <button
                  className="btn-ghost-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(club._id);
                  }}
                >
                  <Trash2 className="icon-sm" />
                  <span>Remove</span>
                </button>
                <button
                  className="btn-ghost-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(club._id);
                  }}
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
