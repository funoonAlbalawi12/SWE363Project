import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import { FiUser } from "react-icons/fi";
import API from "../../../axios";
import "./Tickets.css";

function Tickets() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get(`/api/tickets?userId=${userId}`);
        setTickets(res.data);
      } catch (err) {
        console.error("Failed to fetch tickets:", err);
      }
    };

    fetchTickets();
  }, [userId]);

  const filteredTickets = tickets
    .filter((ticket) =>
      ticket.eventId?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (ticket) => ticket.status === activeTab || activeTab === "upcoming"
    );

  const handleTicketClick = (ticket) => {
    const event = ticket.eventId;
    const codeBase = ticket._id?.slice(-6);
    navigate(`/ticket/${ticket._id}`, {
      state: {
        event: {
          ...event,
          id: ticket._id,
        },
        attendees: ticket.attendees,
        codeBase,
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
            <h3>Tickets</h3>
          </div>

          <div className="ticket-list">
            <div className="ticket-list-header">
              <p className="ticket-count">{filteredTickets.length} tickets</p>
              <input
                className="search-ticket"
                type="text"
                placeholder="Search by event name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

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
              {filteredTickets.map((ticket, idx) => (
                <div
                  className="success-ticket-card"
                  key={ticket._id || idx}
                  onClick={() => handleTicketClick(ticket)}
                >
                  <img
                    src={ticket.eventId?.img}
                    alt={ticket.eventId?.title}
                    className="ticket-img"
                  />
                  <div className="ticket-details">
                    <h3>{ticket.eventId?.title}</h3>
                    <p>{ticket.eventId?.date}</p>
                    <p>{ticket.eventId?.location}</p>

                    <QRCode value={`MRCE-${ticket._id}`} size={64} />
                    <p>
                      <strong>ID:</strong> {ticket._id}
                    </p>
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
