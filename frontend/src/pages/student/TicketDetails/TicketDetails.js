import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import "./TicketDetails.css";

function TicketDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  let event = null;
  let attendees = null;
  let codeBase = null;

  if (state?.event) {
    ({ event, attendees, codeBase } = state);
  } else {
    const id = window.location.pathname.split("/ticket/")[1];
    const storedEvents = JSON.parse(localStorage.getItem("my_events")) || [];
    const matchedEvent = storedEvents.find((e) => e.id === id);
    if (matchedEvent) {
      event = matchedEvent;
      attendees = matchedEvent.attendees;
      codeBase = matchedEvent.codeBase;
    }
  }

  if (!event) return <p>No ticket info found.</p>;

  const goToEventDetails = () => {
    if (!event?.title) return;
    const eventSlug = event.title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/events/${eventSlug}`, { state: { event } });
  };

  const renderTicket = (name, ticketId, qrValue) => (
    <div className="printable-ticket" key={ticketId}>
      <div className="ticket-left">
        <span className="ticket-type">TICKET</span>
      </div>

      <div className="ticket-main">
        <h1 className="ticket-title">{event.title}</h1>
        <div className="ticket-fields">
          <div>
            <p className="label">Name</p>
            <p className="value">{name}</p>
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
        <QRCode value={qrValue} size={96} />
        <p className="ticket-id">ID: {ticketId}</p>
      </div>
    </div>
  );

  return (
    <>
      <DashNavbar />
      <div className="ticket-details-page">
        <button className="back-btn" onClick={() => navigate("/tickets")}>
          ←
        </button>
        <button className="print-btn" onClick={() => window.print()}>
          🖨️ Print Ticket
        </button>

        <div className="event-details-summary">
          <div className="event-info">
            {event.img && (
              <img
                src={event.img}
                alt={event.title}
                className="event-banner"
              />
            )}
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
                🎫 <strong>{attendees?.length || 1} Ticket</strong> (Email Ticket)
              </p>
              <button className="view-event-btn" onClick={goToEventDetails}>
                View event details
              </button>
            </div>
          </div>
        </div>

        <div className="ticket-details-container">
          {attendees?.length > 0
            ? attendees.map((attendee, idx) => {
                const ticketId = `${event.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}-${codeBase + idx}`;
                const qrValue = `MRCE-${codeBase + idx}`;
                return renderTicket(attendee.name, ticketId, qrValue);
              })
            : renderTicket(
                event.name || "N/A",
                event.id,
                event.qrCode || "N/A"
              )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TicketDetails;

