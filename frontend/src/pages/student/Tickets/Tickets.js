import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import "./Tickets.css";
import { FiUser } from "react-icons/fi";

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
    (event) => event.status === activeTab
  );

  const handleTicketClick = (event) => {
    const eventId = event.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/ticket/${eventId}`, { state: { event } });
  };

  return (
    <div className="tickets">
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
              {" "}
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
                className="ticket-card"
                key={idx}
                onClick={() => handleTicketClick(event)}
              >
                <img src={event.img} alt={event.title} />
                <div className="ticket-info">
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                  {event.qrCode && (
                    <>
                      <p>
                        <strong>QR:</strong>
                      </p>
                      <QRCode value={event.qrCode} size={64} />
                    </>
                  )}
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

      <Footer />
    </div>
  );
}

export default Tickets;
