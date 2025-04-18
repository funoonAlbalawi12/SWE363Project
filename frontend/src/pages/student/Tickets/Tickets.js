import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import { FiUser } from "react-icons/fi";
import "./Tickets.css";

function Tickets() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const user = {
    name: "Khulud Alotaibi",
    email: "khulud@gmail.com",
    id: "202168730",
  };

  const storedEvents = JSON.parse(localStorage.getItem("my_events")) || [];

  const filteredTickets = storedEvents.filter(
    (event) => event.status === activeTab && event.email === user.email
  );

  const handleTicketClick = (event) => {
    navigate(`/ticket/${event.id}`, { state: { event } });

    navigate(`/ticket/${event.id}`, {
      state: {
        event,
        attendees: event.attendees,
        codeBase: event.codeBase,
      },
    });
  };

  return (
    <>
      <DashNavbar />
      <div className="tickets">
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
              <p className="ticket-count">{filteredTickets.length} events</p>
              <input
                className="search-ticket"
                type="text"
                placeholder="Search by name"
              />
            </div>

            <h2>My Tickets</h2>
            <div className="ticket-tabs">
              <button
                className={activeTab === "upcoming" ? "active" : ""}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={activeTab === "used" ? "active" : ""}
                onClick={() => setActiveTab("used")}
              >
                Used
              </button>
            </div>

            <div className="tickets-card-grid">
              {filteredTickets.map((event, idx) => (
                <div
                  className="success-ticket-card"
                  key={event.id || idx}
                  onClick={() => handleTicketClick(event)}
                >
                  <img
                    src={event.img}
                    alt={event.title}
                    className="ticket-img"
                  />
                  <div className="ticket-details">
                    <h3>{event.title}</h3>
                    <p>{event.date}</p>
                    <p>{event.location}</p>
                    {event.qrCode && <QRCode value={event.qrCode} size={64} />}
                    {event.id && (
                      <p>
                        <strong>ID:</strong> {event.id}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Tickets;
