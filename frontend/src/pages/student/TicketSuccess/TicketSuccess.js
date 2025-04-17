// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import DashNavbar from "../../../components/DashNavbar";
// import Footer from "../../../components/Footer";
// import QRCode from "react-qr-code";
// import { addEventToMyEvents, getUpcomingEvents } from "../../../data/MyEvents";
// import { useEffect } from "react";

// import "./TicketSuccess.css";

// function TicketSuccess() {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const myTickets = getUpcomingEvents();
//   const {
//     event,
//     contactInfo,
//     attendees,
//     quantity,
//     total,
//     paymentMethod,
//     date,
//     codeBase,
//   } = state;

//   if (!state) return <p>Missing ticket information.</p>;

//   useEffect(() => {
//     if (!state) return;

//     const existing = JSON.parse(localStorage.getItem("my_events")) || [];

//     attendees.forEach((attendee, index) => {
//       const ticketId = `${event.title.toLowerCase().replace(/\s+/g, "-")}-${
//         codeBase + index
//       }`;

//       const alreadyExists = existing.some((e) => e.id === ticketId);
//       if (!alreadyExists) {
//         const ticketData = {
//           id: ticketId,
//           title: event.title,
//           date: event.date,
//           location: event.location,
//           img: event.img,
//           status: "upcoming",
//           qrCode: `MRCE-${codeBase + index}`,
//           name: attendee.name,
//           email: attendee.email,
//         };

//         addEventToMyEvents(ticketData);
//       }
//     });
//   }, [state]);

//   return (
//     <>
//       <DashNavbar />
//       <div className="ticket-success-page">
//         <div className="success-banner">Successfully Registred!</div>

//         <h1>{event.title}</h1>

//         <div className="ticket-info">
//           <div>
//             <strong>Date and Time:</strong> {event.date}
//           </div>

//           <div>
//             <strong>Place:</strong> {event.location}
//           </div>
//           <div>
//             <strong>Tickets:</strong> {quantity} Email Ticket(s)
//           </div>
//         </div>

//         <section className="purchase-summary">
//           <h2>Purchase Information</h2>
//           <div>
//             <strong>Code:</strong> #{codeBase}
//           </div>
//           <div>
//             <strong>Date:</strong> {date}
//           </div>
//           <div>
//             <strong>Total:</strong> {total} SR
//           </div>
//           <div>
//             <strong>Payment Method:</strong> {paymentMethod}
//           </div>
//         </section>

//         <section className="contact-info">
//           <h2>Contact Information</h2>
//           <p>Name: {contactInfo.name}</p>
//           <p>Email: {contactInfo.email}</p>
//           <p>Phone: {contactInfo.phone}</p>
//         </section>

//         <section className="tickets-list">
//           <h2>
//             Ticket ({quantity}) total: {total} SR
//           </h2>
//           {myTickets.map((event, idx) => (
//             <div
//               className="ticket-card"
//               key={idx}
//               onClick={() =>
//                 navigate(
//                   `/ticket/${event.title.toLowerCase().replace(/\s+/g, "-")}`,
//                   {
//                     state: { event },
//                   }
//                 )
//               }
//             >
//               <img src={event.img} alt={event.title} />
//               <div className="ticket-info">
//                 <h3>{event.title}</h3>
//                 <p>{event.date}</p>
//                 <p>{event.location}</p>
//                 <QRCode value={event.qrCode} size={64} />
//                 <p>ID: {event.id}</p>
//               </div>
//             </div>
//           ))}
//         </section>

//         <button
//           className="go-tickets-btn"
//           onClick={() => navigate("/ticket/:ic")}
//         >
//           Go to my ticket
//         </button>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default TicketSuccess;

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
          {myTickets.map((event, idx) => (
            <div
              className="ticket-card"
              key={event.id || idx}
              onClick={() =>
                navigate(
                  `/ticket/${event.title.toLowerCase().replace(/\s+/g, "-")}`,
                  {
                    state: { event },
                  }
                )
              }
            >
              <img src={event.img} alt={event.title} />
              <div className="ticket-info">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.location}</p>
                <p>
                  <strong>QR:</strong>
                </p>
                <QRCode value={event.qrCode} size={64} />
                <p>
                  <strong>ID:</strong> {event.id}
                </p>
              </div>
            </div>
          ))}
        </section>

        <button
          className="go-tickets-btn"
          onClick={() => navigate("/ticket/:id")}
        >
          Go to My Tickets
        </button>
      </div>
      <Footer />
    </>
  );
}

export default TicketSuccess;
