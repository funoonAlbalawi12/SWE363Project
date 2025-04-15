import React from "react";
import { useNavigate } from "react-router-dom";
import "./eventpage.css";
import Navbar from "../../../components/Navbar-users";
import { Plus, Bell, Trash2, Pencil } from "lucide-react";

const EventPage = () => {
  const navigate = useNavigate();

  const events = [
    { id: 1, title: "IEOM KFUPM CHAPTER", description: "Description 1" },
    { id: 2, title: "Coding Marathon", description: "Description 2" },
    { id: 3, title: "Tech Expo 2025", description: "Description 3" },
    { id: 4, title: "AI Symposium", description: "Description 4" },
    { id: 5, title: "Innovation Week", description: "Description 5" },
    { id: 6, title: "Robotics Showdown", description: "Description 6" },
  ];

  const handleCardClick = (id) => {
    navigate(`/event/${id}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    alert(`Edit event with ID: ${id}`);
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    alert(`Remove event with ID: ${id}`);
  };

  return (
    <div className="event-page">
      {/* Navbar */}
      <Navbar />

      <nav className="admin-navbar">
        <div className="admin-navbar-left">
          <div className="logo">Kfupm Activity Network</div>
          <div className="nav-links">
            <a href="#">Dashboard</a>
            <a href="#">Clubs</a>
            <a href="#" className="active">
              Event
            </a>
          </div>
        </div>
        <div className="admin-navbar-right">
          <Bell className="icon" />
          <div className="user-info">
            <div className="user-avatar" />
            <span>User Name</span>
          </div>
        </div>
      </nav>

      {/* Greeting */}
      <div className="greeting">
        <h1>Hello User!</h1>
      </div>

      {/* Add New Event */}
      <div className="add-event">
        <button className="add-button">
          <span>Add new event</span>
          <Plus className="icon" />
        </button>
      </div>

      {/* Event Cards */}
      <div className="card-grid">
        {events.map((event) => (
          <div
            key={event.id}
            className="event-card clickable"
            onClick={() => handleCardClick(event.id)}
          >
            <div className="card-image">Image</div>
            <h2>{event.title}</h2>
            <div className="placeholder-line short" />
            <div className="placeholder-line shorter" />

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

      {/* Footer */}
      <footer className="admin-footer">
        <div>Kfupm Activity Network</div>
      </footer>
    </div>
  );
};

export default EventPage;
