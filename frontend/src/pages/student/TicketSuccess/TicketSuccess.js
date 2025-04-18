import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import { addEventToMyEvents, getUpcomingEvents } from "../../../data/MyEvents";
import "./TicketSuccess.css";

function TicketSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    event,
    contactInfo,
    attendees,
    quantity,
    total,
    paymentMethod,
    date,
    codeBase,
  } = state || {};

  const myTickets = getUpcomingEvents();

  useEffect(() => {
    if (!state || !attendees || !event) return;

    const existing = JSON.parse(localStorage.getItem("my_events")) || [];

    attendees.forEach((attendee, index) => {
      const ticketId = `${event.title.toLowerCase().replace(/\s+/g, "-")}-${
        codeBase + index
      }`;

      const alreadyExists = existing.some((e) => e.id === ticketId);
      if (!alreadyExists) {
        const ticketData = {
          id: ticketId,
          title: event.title,
          price: event.price || "Free",
          date: event.date,
          location: event.location,
          img: event.img,
          status: "upcoming",
          qrCode: `MRCE-${codeBase + index}`,
          name: attendee.name,
          email: attendee.email,
          codeBase: codeBase,
          attendees: attendees,
        };

        addEventToMyEvents(ticketData);
      }
    });
  }, [state]);

  if (!state) return <p>Missing ticket information.</p>;

  return (
    <>
      <DashNavbar />
      <div className="ticket-success-page">
        <div className="success-banner">Successfully Registered!</div>

        <h1>{event.title}</h1>

        <div className="ticket-info">
          <div>
            <strong>Date and Time:</strong> {event.date}
          </div>
          <div>
            <strong>Place:</strong> {event.location}
          </div>
          <div>
            <strong>Tickets:</strong> {quantity} Email Ticket(s)
          </div>
        </div>

        <section className="purchase-summary">
          <h2>Purchase Information</h2>
          <div>
            <strong>Code:</strong> #{codeBase}
          </div>
          <div>
            <strong>Date:</strong> {date}
          </div>
          <div>
            <strong>Total:</strong> {total} SR
          </div>
          <div>
            <strong>Payment Method:</strong> {paymentMethod}
          </div>
        </section>

        <section className="contact-info">
          <h2>Contact Information</h2>
          <p>Name: {contactInfo.name}</p>
          <p>Email: {contactInfo.email}</p>
          <p>Phone: {contactInfo.phone}</p>
        </section>

        <section className="tickets-list">
          <h2>
            Ticket ({quantity}) Total: {total} SR
          </h2>

          <div className="success-tickets-container">
            {attendees.map((attendee, idx) => {
              const qr = `MRCE-${codeBase + idx}`;
              const ticketId = `${event.title
                .toLowerCase()
                .replace(/\s+/g, "-")}-${codeBase + idx}`;

              return (
                <div
                  className="success-ticket-card"
                  key={ticketId}
                  onClick={() =>
                    navigate(`/ticket/${event.id}`, { state: { event } })
                  }
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
                    <QRCode value={qr} size={64} />
                    <p>
                      <strong>ID:</strong> {ticketId}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <button className="go-tickets-btn" onClick={() => navigate("/tickets")}>
          Go to My Tickets
        </button>
      </div>
      <Footer />
    </>
  );
}

export default TicketSuccess;
