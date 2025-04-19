import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import events from "../../../data/EventData";
import "./PurchaseTicket.css";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";

function PurchaseTicket() {
  const { id } = useParams();
  const event = events.find(
    (e) => e.title.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );

  const [showModal, setShowModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [attendees, setAttendees] = useState([{ name: "", email: "" }]);

  const isFree = event.price.toLowerCase().includes("free");
  const price = isFree ? 0 : parseFloat(event.price.match(/\d+/)?.[0] || "0");
  const total = quantity * price;
  const [codeBase] = useState(() =>
    Math.floor(100000 + Math.random() * 900000)
  );

  const handleQuantityChange = (val) => {
    const newQuantity = Math.max(1, quantity + val);
    setQuantity(newQuantity);
    const updatedAttendees = [...attendees];
    while (updatedAttendees.length < newQuantity)
      updatedAttendees.push({ name: "", email: "" });
    while (updatedAttendees.length > newQuantity) updatedAttendees.pop();
    setAttendees(updatedAttendees);
  };

  const handleAttendeeChange = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = () => {
    const { name, email, phone } = contactInfo;
    const validContact = name && isEmailValid(email) && phone;

    const validAttendees = attendees.every(
      (a) => a.name && isEmailValid(a.email)
    );

    return validContact && validAttendees;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  React.useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("my_events")) || [];
    const alreadyExists = attendees.some((attendee) =>
      existing.some(
        (e) => e.title === event.title && e.email === attendee.email
      )
    );

    if (alreadyExists) {
      setAlreadyRegistered(true);
      setRegisterMessage(
        "One or more attendees are already registered for this event."
      );
    } else {
      setAlreadyRegistered(false);
      setRegisterMessage("");
    }
  }, [attendees, event.title]);

  if (!event) return <p>Event not found</p>;

  return (
    <>
      <DashNavbar />
      <div className="ticket-page">
        <button className="back-btn" onClick={() => window.history.back()}>
          ←
        </button>

        <div className="ticket-layout">
          {/* Left: Form */}
          <form className="ticket-form" onSubmit={handleSubmit}>
            <h1>Purchase Ticket</h1>

            <div className="event-summary">
              <h2>{event.title}</h2>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </div>

            <h3>Contact Information</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={contactInfo.name}
              onChange={(e) => {
                const value = e.target.value;
                setContactInfo({ ...contactInfo, name: value });
              }}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={contactInfo.email}
              onChange={(e) => {
                const value = e.target.value;
                setContactInfo({ ...contactInfo, email: value });
              }}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={contactInfo.phone}
              onChange={(e) => {
                const value = e.target.value;
                setContactInfo({ ...contactInfo, phone: value });
              }}
              required
            />

            <h3>Tickets</h3>
            <div className="quantity-control">
              <button type="button" onClick={() => handleQuantityChange(-1)}>
                -
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => handleQuantityChange(1)}>
                +
              </button>
            </div>

            <div className="attendees-section">
              <h4>Attendee Info</h4>
              {attendees.map((attendee, index) => (
                <div key={index} className="attendee">
                  <input
                    type="text"
                    placeholder={`Name of Ticket ${index + 1}`}
                    value={attendee.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleAttendeeChange(index, "name", e.target.value);
                    }}
                    required
                  />
                  <input
                    type="email"
                    placeholder={`Email of Ticket ${index + 1}`}
                    value={attendee.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleAttendeeChange(index, "email", value);
                    }}
                    required
                  />
                </div>
              ))}
            </div>
          </form>

          {/* Right: Summary */}
          <div className="ticket-summary">
            <h2>Summary</h2>
            <p>Price per ticket: {isFree ? "Free" : `${price} SR`}</p>
            <p>Quantity: {quantity}</p>
            <hr />
            <h3>Total: {isFree ? "Free" : `${total} SR`}</h3>
            <button
              className="submit-btn"
              onClick={() => {
                if (!isFormValid()) return;

                if (alreadyRegistered) return; // block if already registered

                if (isFree) {
                  navigate("/ticket-success", {
                    state: {
                      event,
                      contactInfo,
                      attendees,
                      quantity,
                      total,
                      paymentMethod: "Free Registration",
                      date: new Date().toLocaleDateString("en-GB"),
                      codeBase,
                    },
                  });
                } else {
                  setShowModal(true);
                }
              }}
              disabled={!isFormValid() || alreadyRegistered}
            >
              {isFree ? "Register Now" : `Pay Now - ${total} SR`}
            </button>

            {(!isFormValid() || alreadyRegistered) && (
              <p className="error-tooltip">
                {!isFormValid()
                  ? "Please fill in all contact and attendee fields correctly."
                  : registerMessage}
              </p>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Payment</h2>
            <p>
              You are about to pay {total} SR for {quantity} ticket(s).
            </p>
            <div className="modal-actions">
              <button
                onClick={() => {
                  navigate("/ticket-success", {
                    state: {
                      event,
                      contactInfo,
                      attendees,
                      quantity,
                      total,
                      paymentMethod: "Visa •••• 5987", // or a dynamic value
                      date: new Date().toLocaleDateString("en-GB"),
                      codeBase,
                    },
                  });
                }}
              >
                Confirm
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PurchaseTicket;
