import React from "react";
import { useNavigate } from "react-router-dom";
import "./eventpage.css";
import AdminNavbar2 from "../../../components/AdminNavbar2";
import eventsData from "../../../data/EventData";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";




import { Plus, Trash2, Pencil } from "lucide-react";

const EventsPage = () => {
  const navigate = useNavigate();

  const events = Object.entries(eventsData).map(([key, event], index) => ({
    id: key,
    title: event.title,
    date: event.date,
    location: event.location,
    img: event.img,
    price: event.price,
  }));

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
    <div className="events-page">
      {/* Admin Navigation */}
      <AdminNavbar2 />
      <div className="page-content">
        {/* Greeting */}
        <div className="greeting">
          <h1>Hello Admin!</h1>
        </div>

        {/* Add New Club */}
        <div className="add-event">
          <button className="add-button">
            <span>Add new club</span>
            <Plus className="icon" />
          </button>
        </div>

        {/* Club Cards */}
        <div className="eventcard-grid">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card clickable"
              onClick={() => handleCardClick(event.id)}
            >
              <div className="card-image">Image</div>
              <h2>{event.title}</h2>
              <p className="price">{event.price || "Free"}</p>
              <p>
                <FaCalendarAlt /> {event.date}
              </p>
              <p>
                <FaMapMarkerAlt /> {event.location}
              </p>

              {/* Admin Options */}
              <div className="card-actions">
                <button
                  className="btn-ghost-sm"
                  onClick={(e) => handleRemove(e, event.id)}
                >
                  <Trash2 className="icon-sm" />
                  <span>Remove</span>
                </button>
                <button
                  className="btn-ghost-sm"
                  onClick={(e) => handleEdit(e, event.id)}
                >
                  <Pencil className="icon-sm" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="footer">
        <p>© 2025 KFUPM Activity Network. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EventsPage;
