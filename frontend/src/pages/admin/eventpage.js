import React from "react";
import "./eventpage.css";
import { Plus, Bell, Trash2, Pencil } from "lucide-react";

const EventPage = () => {
  const eventCards = Array.from({ length: 6 });

  return (
    <div className="event-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">Kfupm Activity Network</div>
          <div className="nav-links">
            <a href="#">Dashboard</a>
            <a href="#">Clubs</a>
            <a href="#" className="active">Event</a>
          </div>
        </div>
        <div className="navbar-right">
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
        {eventCards.map((_, idx) => (
          <div key={idx} className="event-card">
            <div className="card-image">Image</div>
            <h2>IEOM KFUPM CHAPTER</h2>
            <div className="placeholder-line short" />
            <div className="placeholder-line shorter" />
            <div className="card-actions">
              <button className="action-button">
                <Trash2 className="icon" /> Remove
              </button>
              <button className="action-button">
                <Pencil className="icon" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div>Kfupm Activity Network</div>
      </footer>
    </div>
  );
};

export default EventPage;