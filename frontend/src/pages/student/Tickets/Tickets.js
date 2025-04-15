import React from "react";
import { useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";

import "./Tickets.css";
import { FiUser } from "react-icons/fi";

function Tickets() {
  const navigate = useNavigate();

  const user = {
    name: "Khulud Alotaibi",
    email: "khulud@gmail.com",
    id: "202168730",
  };

  const myTickets = [
    {
      id: "gsr",
      title: "GSR - Global Student Research",
      date: "February 06 | 10:00 AM",
      location: "KFUPM, Saudi Arabia",
      img: "/images/gsr.jpg",
      status: "upcoming",
    },
    {
      id: "photography",
      title: "Photography Workshop",
      date: "February 10 | 03:00 PM",
      location: "Building 70, KFUPM",
      img: "/images/photo-event.jpg",
    },
  ];

  const handleTicketClick = (event) => {
    const eventId = event.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/ticket/${eventId}`, { state: { event } });
  };

  return (
    <>
      <DashNavbar />
      <div className="tickets-page">
        <div className="profile-card">
          <div className="profile-avatar">
            <FiUser />
          </div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>

        <div className="ticket-list">
          <div className="ticket-list-header">
            <p className="ticket-count">{myTickets.length} events</p>
            <input
              className="search-ticket"
              type="text"
              placeholder="Search by name"
            />
          </div>

          <h2>My Tickets</h2>
          <div className="ticket-tabs">
            <button className="active">Upcoming</button>
            <button>Used</button>
          </div>

          <div className="tickets-card-grid">
            {myTickets.map((event, idx) => (
              <div
                className="ticket-card"
                key={idx}
                onClick={() => handleTicketClick(event)}
              >
                <img src={event.img} alt={event.title} />
                <div className="ticket-info">
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3>Recommended for you</h3>
      <div className="recommendation-carousel">
        {/* Insert EventCards here */}
      </div>

      <Footer />
    </>
  );
}

export default Tickets;
