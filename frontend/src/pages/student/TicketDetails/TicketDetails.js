import React from "react";
import { useLocation } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import "./TicketDetails.css";

function TicketDetails() {
  const { state } = useLocation();
  const { event } = state || {};

  if (!event) return <p>No ticket info found.</p>;

  return (
    <>
      <DashNavbar />

      <div className="ticket-details-page">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>

        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print Ticket
        </button>

        {/* Event Overview */}
        <div className="event-details-summary">
          <div className="event-info">
            <img src={event.img} alt={event.title} className="event-banner" />
            <div className="meta">
              <h1>{event.title}</h1>
              <p className="meta-item">
                📅 <strong>Date and Time:</strong> {event.date}
              </p>
              <p className="meta-item">
                📍 <strong>Location:</strong> {event.location}
              </p>
              <p className="meta-item">
                ⏱️ <strong>Duration:</strong> 10 Hours
              </p>
              <p className="meta-item">
                🎫 <strong>1 Ticket</strong> (Email Ticket)
              </p>
              <button className="view-event-btn">View event details</button>
            </div>
          </div>
        </div>

        {/* Printable Ticket */}
        <div className="printable-ticket">
          <div className="ticket-left">
            <span className="ticket-type">TICKET</span>
          </div>

          <div className="ticket-main">
            <h1 className="ticket-title">{event.title}</h1>

            <div className="ticket-fields">
              <div>
                <p className="label">Name</p>
                <p className="value">{event.name || "N/A"}</p>
              </div>
              <div>
                <p className="label">Date</p>
                <p className="value">{event.date}</p>
              </div>
            </div>

            <div className="ticket-address">
              <p className="label">Event Address</p>
              <p className="value">{event.location}</p>
            </div>
          </div>

          <div className="ticket-right">
            <p className="qr-label">Scan to check in</p>
            <QRCode value={event.qrCode || "N/A"} size={96} />
            <p className="ticket-id">ID {event.id}</p>
          </div>
        </div>

        {/* Recommended */}
        <div className="recommended-events">
          <h3>Recommended for you</h3>
          {/* Insert EventCards or carousel here */}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TicketDetails;
