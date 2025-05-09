import React, { useState, useEffect } from "react";
import axios from "axios";  // Import Axios
import { useNavigate } from "react-router-dom";
import "./eventpage.css";
import AdminNavbar from "../../../components/AdminNavbar";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Plus, Trash2, Pencil } from "lucide-react";
import Footer from "../../../components/Footer";

const EventsPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);  // State to store events
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    priceType: "free",
    price: "",
    img: null,
  });

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/events");
        setEvents(response.data);  // Set events to state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();  // Call the function to fetch events
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("location", formData.location);
      data.append("priceType", formData.priceType);
      data.append("price", formData.priceType === "paid" ? formData.price : "Free");
      if (formData.img) data.append("img", formData.img);
  
      const response = await axios.post("http://localhost:5001/api/events", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      setEvents([...events, response.data]);  // Add new event to list
      setFormData({
        title: "",
        date: "",
        location: "",
        priceType: "free",
        price: "",
        img: null,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
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
              <input
                type="text"
                name="title"
                required
                onChange={handleFormChange}
              />

              <label>Date & Time</label>
              <input
                type="datetime-local"
                name="date"
                required
                onChange={handleFormChange}
              />

              <label>Location</label>
              <input
                type="text"
                name="location"
                required
                onChange={handleFormChange}
              />

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
                  <input
                    type="number"
                    name="price"
                    onChange={handleFormChange}
                  />
                </>
              )}

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

        <div className="eventcard-grid">
          {events.map((event) => (
            <div
              key={event._id}  // Use _id from MongoDB
              className="event-cardAdmin"
              onClick={() => handleCardClick(event._id)}  // Use _id from MongoDB
            >
              <div className="card-image">
                <img src={event.img} alt={event.title} />
              </div>
              <h2>{event.title}</h2>
              <p className="price">{event.price || "Free"}</p>
              <p>
                <FaCalendarAlt /> {event.date}
              </p>
              <p>
                <FaMapMarkerAlt /> {event.location}
              </p>
              <div className="card-actions">
                <button
                  className="btn-ghost-sm"
                  onClick={(e) => handleRemove(e, event._id)}
                >
                  <Trash2 className="icon-sm" />
                  <span>Remove</span>
                </button>
                <button
                  className="btn-ghost-sm"
                  onClick={(e) => handleEdit(e, event._id)}
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

export default EventsPage;
