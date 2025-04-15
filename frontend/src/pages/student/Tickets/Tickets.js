import React from "react";
import { useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import events from "../../../data/EventData";
import "./Tickets.css";

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
        <div className="ticket-header">
          <div className="profile-card">
            <img className="avatar" src="/images/avatar.png" alt="User" />
            <h3>User Name</h3>
            <p>user@email.com</p>
          </div>

          <div className="ticket-list">
            <h2>My Tickets</h2>
            <div className="ticket-tabs">
              <button className="active">Upcoming</button>
              <button>Used</button>
            </div>

            <input
              className="search-ticket"
              type="text"
              placeholder="Search by name"
            />

            <div className="tickets-grid">
              {events.map((event, idx) => (
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
      </div>
      <Footer />
    </>
  );
}

export default Tickets;
