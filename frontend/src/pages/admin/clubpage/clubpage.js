import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./clubpage.css";
import AdminNavbar from "../../../components/AdminNavbar";
import { Plus, Trash2, Pencil } from "lucide-react";
import Footer from "../../../components/Footer";

const ClubsPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    description: "",
    overview: "",
    vision: "",
    mission: "",
    adminId: "",
    socialLinks: [{ name: "", icon: "", url: "" }],
  });

  const [clubs, setClubs] = useState([]);

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

  const resetForm = () => {
    setFormData({
      name: "",
      img: null,
      description: "",
      overview: "",
      vision: "",
      mission: "",
      adminId: "",
      socialLinks: [{ name: "", icon: "", url: "" }],
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: updatedLinks,
    }));
  };

  const handleAddSocialLink = () => {
    setFormData((prevData) => ({
      ...prevData,
      socialLinks: [...prevData.socialLinks, { name: "", icon: "", url: "" }],
    }));
  };

  const handleRemoveSocialLink = (index) => {
    setFormData((prevData) => {
      const updatedLinks = [...prevData.socialLinks];
      updatedLinks.splice(index, 1);
      return { ...prevData, socialLinks: updatedLinks };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      for (const key of ["name", "description", "overview", "vision", "mission", "adminId"]) {
        formDataToSubmit.append(key, formData[key]);
      }
      if (formData.img) {
        formDataToSubmit.append("image", formData.img);
      }
      formDataToSubmit.append("socialLinks", JSON.stringify(formData.socialLinks));

      const response = await axios.post("http://localhost:5001/api/clubs", formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setClubs((prev) => [...prev, response.data]);
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error creating club:", error.response?.data || error.message);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/clubs/${id}`);
      setClubs((prev) => prev.filter((club) => club._id !== id));
    } catch (error) {
      console.error("Error removing club:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-club/${id}`);
  };

  return (
    <div className="clubs-page">
      <AdminNavbar />
      <div className="page-content">
        <div className="greeting">
          <h1>Hello Khulud!</h1>
        </div>

        <div className="add-club">
          <button className="add-button" onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}>
            +    Add new club
          </button>
        </div>

        {showForm && (
          <div className="event-form-overlay">
            <form className="event-form" onSubmit={handleSubmit}>
              <h2>Add Club</h2>

              <label htmlFor="name">Club Name</label>
              <input type="text" name="name" id="name" value={formData.name} required onChange={handleFormChange} />

              <label htmlFor="img">Club Logo</label>
              <input type="file" accept="image/*" name="img" id="img" onChange={handleFormChange} />

              <label htmlFor="description">Description</label>
              <input name="description" id="description" value={formData.description} onChange={handleFormChange} />

              <label htmlFor="overview">Overview</label>
              <input name="overview" id="overview" value={formData.overview} onChange={handleFormChange} />

              <label htmlFor="vision">Vision</label>
              <input name="vision" id="vision" value={formData.vision} onChange={handleFormChange} />

              <label htmlFor="mission">Mission</label>
              <input name="mission" id="mission" value={formData.mission} onChange={handleFormChange} />

              <label>Social Links</label>
              {formData.socialLinks.map((link, index) => (
                <div key={index} className="social-link-inputs">
                  <input
                    type="text"
                    placeholder="Name"
                    value={link.name}
                    onChange={(e) => handleSocialLinkChange(index, "name", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Icon"
                    value={link.icon}
                    onChange={(e) => handleSocialLinkChange(index, "icon", e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                  />
                  <button type="button" className="btn-remove-link" onClick={() => handleRemoveSocialLink(index)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn-add-link" onClick={handleAddSocialLink}>
                + Add Social Link
              </button>

              <div className="form-actions">
                <button type="submit" className="login-btn" onClick={handleSubmit}>Submit</button>
                <button type="button" className="login-btn" onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="card-grid">
          {clubs.map((club) => (
            <div key={club._id} className="club-card clickable" onClick={() => navigate(`/club/${club._id}`)}>
              <div className="card-image">
                {club.image ? (
                  <img src={club.image} alt={club.name} className="club-thumbnail" />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <h2>{club.name}</h2>
              <p className="club-description">{club.description}</p>

              <div className="card-actions">
                <button className="btn-ghost-sm" onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(club._id);
                }}>
                  <Trash2 className="icon-sm" /> <span>Remove</span>
                </button>
                <button className="btn-ghost-sm" onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(club._id);
                }}>
                  <Pencil className="icon-sm" /> <span>Edit</span>
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
