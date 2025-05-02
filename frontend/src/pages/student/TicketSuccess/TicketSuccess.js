

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import axios from "axios";
import "./TicketSuccess.css";

function TicketSuccess() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/tickets?userId=${userId}`);
        const allTickets = res.data;

        if (allTickets.length === 0) {
          setLoading(false);
          return;
        }

        const latest = allTickets[allTickets.length - 1];
        setTickets([latest]); // show most recent ticket
      } catch (err) {
        console.error("Failed to load tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (tickets.length === 0) return <p>No ticket found.</p>;

  const ticket = tickets[0];
  const event = ticket.eventId;
  const attendees = ticket.attendees;
  const codeBase = ticket._id.slice(-6); // mock code
  const total = attendees.length * (event.price.toLowerCase().includes("free") ? 0 : parseFloat(event.price));
  const date = new Date(ticket.createdAt).toLocaleDateString("en-GB");

  return (
    <>
      <DashNavbar />
      <div className="ticket-success-page">
        <div className="success-banner">Successfully Registered!</div>

        <h1>{event.title}</h1>
        <div className="info-sections">
          <div className="ticket-info">
            <h2>Ticket Information</h2>
            <div><strong>Date and Time:</strong> {event.date}</div>
            <div><strong>Place:</strong> {event.location}</div>
            <div><strong>Tickets:</strong> {attendees.length} Email Ticket(s)</div>
          </div>

          <section className="purchase-summary">
            <h2>Purchase Information</h2>
            <div><strong>Code:</strong> #{codeBase}</div>
            <div><strong>Date:</strong> {date}</div>
            <div><strong>Total:</strong> {total} SR</div>
            <div><strong>Payment Method:</strong> Stripe Checkout</div>
          </section>

          <section className="contact-info">
            <h2>Contact Information</h2>
            <div><strong>Name:</strong> {attendees[0].name}</div>
            <div><strong>Email:</strong> {attendees[0].email}</div>
            <div><strong>Phone:</strong> [Hidden]</div>
          </section>
        </div>

        <section className="tickets-list">
          <h2>({attendees.length}) Ticket with Total: {total} SR</h2>

          <div className="success-tickets-container">
            {attendees.map((attendee, idx) => {
              const qr = `MRCE-${codeBase + idx}`;
              const ticketId = `${event.title.toLowerCase().replace(/\s+/g, "-")}-${codeBase + idx}`;

              return (
                <div
                  className="success-ticket-card"
                  key={ticketId}
                  onClick={() =>
                    navigate(`/ticket/${ticketId}`, {
                      state: { event, attendees, codeBase }
                    })
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
                    <p><strong>ID:</strong> {ticketId}</p>
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
