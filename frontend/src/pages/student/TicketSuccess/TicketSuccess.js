// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import DashNavbar from "../../../components/DashNavbar";
// import Footer from "../../../components/Footer";
// import QRCode from "react-qr-code";
// import "./TicketSuccess.css";
// import axios from "axios";

// function TicketSuccess() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [ticketData, setTicketData] = useState(null);

//   useEffect(() => {
//     if (location.state) {
//       setTicketData(location.state);
//     } else {
//       const saved = localStorage.getItem("ticketInfo");
//       if (saved) {
//         setTicketData(JSON.parse(saved));
//         localStorage.removeItem("ticketInfo"); // clean it up
//       }
//     }
//   }, [location.state]);
//   useEffect(() => {
//     const info = localStorage.getItem("ticketInfoToSave");
//     if (info) {
//       const { userId, eventId, attendees } = JSON.parse(info);
//       axios
//         .post("http://localhost:5001/api/tickets", {
//           userId,
//           eventId,
//           attendees,
//         })
//         .then(() => {
//           localStorage.removeItem("ticketInfoToSave");
//         })
//         .catch((err) => {
//           console.error("Error saving ticket after Stripe:", err);
//         });
//     }
//   }, []);

//   if (!ticketData) return <p>No ticket information available.</p>;

//   const {
//     event,
//     contactInfo,
//     attendees,
//     quantity,
//     total,
//     paymentMethod,
//     date,
//     codeBase,
//   } = ticketData;

//   return (
//     <>
//       <DashNavbar />
//       <div className="ticket-success-page">
//         <div className="success-banner">Successfully Registered!</div>

//         <h1>{event.title}</h1>
//         <div className="info-sections">
//           <div className="ticket-info">
//             <h2>Ticket Information</h2>
//             <div>
//               <strong>Date and Time:</strong> {event.date}
//             </div>
//             <div>
//               <strong>Place:</strong> {event.location}
//             </div>
//             <div>
//               <strong>Tickets:</strong> {attendees.length} Email Ticket(s)
//             </div>
//           </div>

//           <section className="purchase-summary">
//             <h2>Purchase Information</h2>
//             <div>
//               <strong>Code:</strong> #{codeBase}
//             </div>
//             <div>
//               <strong>Date:</strong> {date}
//             </div>
//             <div>
//               <strong>Total:</strong> {total} SR
//             </div>
//             <div>
//               <strong>Payment Method:</strong> {paymentMethod}
//             </div>
//           </section>

//           <section className="contact-info">
//             <h2>Contact Information</h2>
//             <div>
//               <strong>Name:</strong> {contactInfo.name}
//             </div>
//             <div>
//               <strong>Email:</strong> {contactInfo.email}
//             </div>
//             <div>
//               <strong>Phone:</strong> {contactInfo.phone || "[Hidden]"}
//             </div>
//           </section>
//         </div>

//         <section className="tickets-list">
//           <h2>
//             ({attendees.length}) Ticket with Total: {total} SR
//           </h2>

//           <div className="success-tickets-container">
//             {attendees.map((attendee, idx) => {
//               const qr = `MRCE-${codeBase + idx}`;
//               const ticketId = `${event.title
//                 .toLowerCase()
//                 .replace(/\s+/g, "-")}-${codeBase + idx}`;

//               return (
//                 <div
//                   className="success-ticket-card"
//                   key={ticketId}
//                   onClick={() =>
//                     navigate(`/ticket/${ticketId}`, {
//                       state: { event, attendees, codeBase },
//                     })
//                   }
//                 >
//                   <img
//                     src={event.img}
//                     alt={event.title}
//                     className="ticket-img"
//                   />
//                   <div className="ticket-details">
//                     <h3>{event.title}</h3>
//                     <p>{event.date}</p>
//                     <p>{event.location}</p>
//                     <QRCode value={qr} size={64} />
//                     <p>
//                       <strong>ID:</strong> {ticketId}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         <button className="go-tickets-btn" onClick={() => navigate("/tickets")}>
//           Go to My Tickets
//         </button>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default TicketSuccess;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import QRCode from "react-qr-code";
import "./TicketSuccess.css";
import axios from "axios";

function TicketSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fromStripe = params.get("from") === "stripe";

  const [ticketData, setTicketData] = useState(null);

  // Load ticketData from state or localStorage
  useEffect(() => {
    if (location.state) {
      setTicketData(location.state);
    } else {
      const saved = localStorage.getItem("ticketInfo");
      if (saved) {
        setTicketData(JSON.parse(saved));
        localStorage.removeItem("ticketInfo");
      }
    }
  }, [location.state]);

  // Save ticket to DB if redirected from Stripe
  useEffect(() => {
    if (fromStripe) {
      const info = localStorage.getItem("ticketInfoToSave");
      if (info) {
        const { userId, eventId, attendees } = JSON.parse(info);
        axios
          .post("http://localhost:5001/api/tickets", {
            userId,
            eventId,
            attendees,
          })
          .then(() => {
            console.log("✅ Ticket saved to DB after Stripe");
            localStorage.removeItem("ticketInfoToSave");
          })
          .catch((err) => {
            console.error("❌ Error saving ticket after Stripe:", err);
          });
      }
    }
  }, [fromStripe]);

  if (!ticketData) return <p>No ticket information available.</p>;

  const {
    event,
    contactInfo,
    attendees,
    quantity,
    total,
    paymentMethod,
    date,
    codeBase,
  } = ticketData;

  return (
    <>
      <DashNavbar />
      <div className="ticket-success-page">
        <div className="success-banner">Successfully Registered!</div>

        <h1>{event.title}</h1>
        <div className="info-sections">
          <div className="ticket-info">
            <h2>Ticket Information</h2>
            <div>
              <strong>Date and Time:</strong> {event.date}
            </div>
            <div>
              <strong>Place:</strong> {event.location}
            </div>
            <div>
              <strong>Tickets:</strong> {attendees.length} Email Ticket(s)
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
            <div>
              <strong>Name:</strong> {contactInfo.name}
            </div>
            <div>
              <strong>Email:</strong> {contactInfo.email}
            </div>
            <div>
              <strong>Phone:</strong> {contactInfo.phone || "[Hidden]"}
            </div>
          </section>
        </div>

        <section className="tickets-list">
          <h2>
            ({attendees.length}) Ticket with Total: {total} SR
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
                    navigate(`/ticket/${ticketId}`, {
                      state: { event, attendees, codeBase },
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
