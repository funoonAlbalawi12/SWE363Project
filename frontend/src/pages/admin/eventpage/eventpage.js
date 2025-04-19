import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./eventpage.css";
import AdminNavbar from "../../../components/AdminNavbar";
import eventsData from "../../../data/EventData";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Plus, Trash2, Pencil } from "lucide-react";

const EventsPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    priceType: "free",
    price: "",
    img: null,
  });

  const events = Object.entries(eventsData).map(([key, event]) => ({
    id: key,
    title: event.title,
    date: event.date,
    location: event.location,
    img: event.img,
    price: event.price,
  }));

  const handleCardClick = (id) => navigate(`/club/${id}`);
  const handleEdit = (e, id) => {
    e.stopPropagation();
    alert(`Edit event with ID: ${id}`);
  };
  const handleRemove = (e, id) => {
    e.stopPropagation();
    alert(`Remove event with ID: ${id}`);
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
    console.log("Event submitted:", formData);
    setFormData({ title: "", date: "", location: "", priceType: "free", price: "", img: null });
    setShowForm(false);
  };

  return (
    <div className="events-page">
      <AdminNavbar />
      <div className="page-content">
        <div className="greeting">
          <h1>Hello Admin!</h1>
        </div>

        <div className="add-event">
          <button className="add-button" onClick={toggleForm}>
            <span>Add new event</span>
            <Plus className="icon" />
          </button>
        </div>

        {showForm && (
          <div className="event-form-overlay">
            <form className="event-form" onSubmit={handleSubmit}>
              <h2>Add Event</h2>
              <label>Title</label>
              <input type="text" name="title" required onChange={handleFormChange} />

              <label>Date & Time</label>
              <input type="datetime-local" name="date" required onChange={handleFormChange} />

              <label>Location</label>
              <input type="text" name="location" required onChange={handleFormChange} />

              <label>Image</label>
              <input type="file" accept="image/*" onChange={handleFormChange} />

              <label>Is it Free?</label>
              <select name="priceType" onChange={handleFormChange}>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>

              {formData.priceType === "paid" && (
                <>
                  <label>Price (SAR)</label>
                  <input type="number" name="price" onChange={handleFormChange} />
                </>
              )}

              <div className="form-actions">
                <button type="submit" className="login-btn">Submit</button>
                <button type="button" className="login-btn" onClick={toggleForm}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="eventcard-grid">
          {events.map((event) => (
            <div key={event.id} className="event-cardAdmin" onClick={() => handleCardClick(event.id)}>
              <div className="card-image">
                <img src={event.img} alt={event.title} />
              </div>              <h2>{event.title}</h2>
              <p className="price">{event.price || "Free"}</p>
              <p><FaCalendarAlt /> {event.date}</p>
              <p><FaMapMarkerAlt /> {event.location}</p>

              <div className="card-actions">
                <button className="btn-ghost-sm" onClick={(e) => handleRemove(e, event.id)}>
                  <Trash2 className="icon-sm" /><span>Remove</span>
                </button>
                <button className="btn-ghost-sm" onClick={(e) => handleEdit(e, event.id)}>
                  <Pencil className="icon-sm" /><span>Edit</span>
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

export default EventsPage;
