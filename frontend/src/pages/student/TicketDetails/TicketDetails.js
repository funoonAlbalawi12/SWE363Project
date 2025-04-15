import React from "react";
import { useParams } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import "./TicketDetails.css";

function TicketDetails() {
  const { id } = useParams();

  const ticket = {
    title: "GSR - Global Student Research",
    date: "Tuesday, February 06 | 10:00 AM",
    location: "Building 60, KFUPM, Saudi Arabia",
    tickets: [
      {
        name: "user",
        email: "user@email.com",
        phone: "+966 50 000 0000",
        code: "MRCE-94812",
      },
      {
        name: "user2",
        email: "user2@email.com",
        phone: "+966 50 000 0001",
        code: "MRCE-94813",
      },
    ],
    total: "20SR",
    image: "/images/gsr-banner.jpg",
  };

  return (
    <>
      <DashNavbar />
      <div className="ticket-details-page">
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back
        </button>

        <h2>{ticket.title}</h2>
        <img src={ticket.image} alt={ticket.title} className="ticket-banner" />

        <div className="event-details">
          <p>
            <strong>Date:</strong> {ticket.date}
          </p>

          <p>
            <strong>Location:</strong> {ticket.location}
          </p>
          <p>
            <strong>Tickets:</strong> {ticket.tickets.length} Email Tickets
          </p>
        </div>

        <h3>Total: {ticket.total}</h3>

        {ticket.tickets.map((t, idx) => (
          <div key={idx} className="ticket-entry">
            <div>
              <p>
                <strong>Ticket {idx + 1}</strong>
              </p>
              <p>Name: {t.name}</p>
              <p>Email: {t.email}</p>
              <p>Phone: {t.phone}</p>
            </div>
            <div>
              <p>Code: {t.code}</p>
              <QRCode value={t.code} size={64} />
            </div>
          </div>
        ))}

        <Footer />
      </div>
    </>
  );
}

export default TicketDetails;
