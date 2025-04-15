import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code"; // install via npm if not done

import "./TicketSuccess.css";

function TicketSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) return <p>Missing ticket information.</p>;

  const {
    event,
    contactInfo,
    attendees,
    quantity,
    total,
    paymentMethod,
    date,
    codeBase,
  } = state;

  return (
    <>
      <DashNavbar />
      <div className="ticket-success-page">
        <div className="success-banner">Successful payment!</div>

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
            Ticket ({quantity}) total: {total} SR
          </h2>
          {attendees.map((attendee, index) => {
            const code = `MRCE-${codeBase + index}`;
            return (
              <div key={index} className="ticket-card">
                <div>
                  <p>
                    <strong>Ticket {index + 1}</strong>
                  </p>
                  <p>Name: {attendee.name}</p>
                  <p>Email: {attendee.email}</p>
                </div>
                <div className="qr-section">
                  <p>
                    <strong>Code:</strong> {code}
                  </p>
                  <QRCode value={code} size={64} />
                </div>
              </div>
            );
          })}
        </section>

        <button className="go-tickets-btn" onClick={() => navigate("/tickets")}>
          Go to my ticket
        </button>
      </div>

      <Footer />
    </>
  );
}

export default TicketSuccess;
