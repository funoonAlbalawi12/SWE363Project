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
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const handleAddSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { name: "", icon: "", url: "" }],
    });
  };

  const handleRemoveSocialLink = (index) => {
    const updatedLinks = [...formData.socialLinks];
    updatedLinks.splice(index, 1);
    setFormData({ ...formData, socialLinks: updatedLinks });
  };


  const handleConfirmSubmit = async () => {
    console.log("Submitting club form...");
  
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("overview", formData.overview);
      formDataToSubmit.append("vision", formData.vision);
      formDataToSubmit.append("mission", formData.mission);
      formDataToSubmit.append("adminId", formData.adminId);
      formDataToSubmit.append("image", formData.img);
      formDataToSubmit.append("socialLinks", JSON.stringify(formData.socialLinks));
  
      // Debug: log content
      for (let [key, value] of formDataToSubmit.entries()) {
        console.log(key, value);
      }
  
      const response = await axios.post("http://localhost:5001/api/clubs", formDataToSubmit);
  
      console.log("Club created:", response.data);
      setClubs([...clubs, response.data]);
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
      setShowForm(false);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error creating club:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };
  
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
          <button className="add-button" onClick={() => setShowForm(!showForm)}>
            Add new club <Plus className="icon inside-button" />
          </button>
        </div>


        {showForm && (
          <div className="event-form-overlay">
            <form className="event-form" onSubmit={handleSubmit}>
              <h2>Add Club</h2>
              <label>Club Name</label>
              <input type="text" name="name" value={formData.name} required onChange={handleFormChange} />

              <label>Club Logo</label>
              <input type="file" accept="image/*" name="img" onChange={handleFormChange} />

              <label>Description</label>
              <input name="description" value={formData.description} onChange={handleFormChange} />

              <label>Overview</label>
              <input name="overview" value={formData.overview} onChange={handleFormChange} />

              <label>Vision</label>
              <input name="vision" value={formData.vision} onChange={handleFormChange} />

              <label>Mission</label>
              <input name="mission" value={formData.mission} onChange={handleFormChange} />

              <label>Social Links</label>
              {formData.socialLinks.map((link, index) => (
                <div key={index} className="social-link-inputs">
                  <input type="text" placeholder="Name" value={link.name} onChange={(e) => handleSocialLinkChange(index, "name", e.target.value)} />
                  <input type="text" placeholder="Icon" value={link.icon} onChange={(e) => handleSocialLinkChange(index, "icon", e.target.value)} />
                  <input type="url" placeholder="URL" value={link.url} onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)} />
                  <button type="button" onClick={() => handleRemoveSocialLink(index)}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={handleAddSocialLink}>Add Social Link</button>

              <div className="form-actions">
                <button type="submit" className="login-btn">Submit</button>
                <button type="button" className="login-btn" onClick={() => setShowForm(false)}>Cancel</button>
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
                <button className="btn-ghost-sm" onClick={(e) => { e.stopPropagation(); handleRemove(club._id); }}>
                  <Trash2 className="icon-sm" /> <span>Remove</span>
                </button>
                <button className="btn-ghost-sm" onClick={(e) => { e.stopPropagation(); handleEdit(club._id); }}>
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
