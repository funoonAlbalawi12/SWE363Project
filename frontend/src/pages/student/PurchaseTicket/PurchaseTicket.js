
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PurchaseTicket.css";
import DashNavbar from "../../../components/DashNavbar";
import Footer from "../../../components/Footer";
import { loadStripe } from "@stripe/stripe-js";

function PurchaseTicket() {
  const { title } = useParams(); 
  const navigate = useNavigate();
  const stripePromise = loadStripe(
    "pk_test_51Qo4GD2akrE2h9Zmul6Js8VIseQujd8EmzsTcj7e2xkaL9F74865HHyjh527O0usIRiiAvq7KNjh5Xmechb9mtGf009Jn3kUtE"
  );
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [attendees, setAttendees] = useState([{ name: "", email: "" }]);
  const [codeBase] = useState(() =>
    Math.floor(100000 + Math.random() * 900000)
  );

  const userId = localStorage.getItem("userId");

  const handleQuantityChange = (val) => {
    const newQuantity = Math.max(1, quantity + val);
    setQuantity(newQuantity);
    const updated = [...attendees];
    while (updated.length < newQuantity) updated.push({ name: "", email: "" });
    while (updated.length > newQuantity) updated.pop();
    setAttendees(updated);
  };

  const handleAttendeeChange = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = () => {
    const validContact =
      contactInfo.name && isEmailValid(contactInfo.email) && contactInfo.phone;
    const validAttendees = attendees.every(
      (a) => a.name && isEmailValid(a.email)
    );
    return validContact && validAttendees;
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/events/title/${title}`
        );
        setEvent(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load event:", err);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [title]);
  useEffect(() => {
    const checkEmails = async () => {
      if (!event || !event._id) return;
  
      const duplicateEmails = [];
  
      for (let a of attendees) {
        try {
          const res = await axios.get(`http://localhost:5001/api/tickets/check`, {
            params: {
              eventId: event._id,
              email: a.email,
            },
          });
  
          if (res.data.alreadyRegistered) {
            duplicateEmails.push(a.email);
          }
        } catch (err) {
          console.error("Error checking attendee:", err);
        }
      }
  
      if (duplicateEmails.length > 0) {
        setAlreadyRegistered(true);
        setRegisterMessage(
          `${[...new Set(duplicateEmails)]
            .map((email) => {
              const match = attendees.find((a) => a.email === email);
              return `${match?.name || email} is already registered`;
            })
            .join(", ")}`
        );
        
      } else {
        setAlreadyRegistered(false);
        setRegisterMessage("");
      }
    };
  
    checkEmails();
  }, [attendees, event]);
  
  

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found</p>;

  const isFree = event.price.toLowerCase().includes("free");
  const price = isFree ? 0 : parseFloat(event.price.match(/\d+/)?.[0] || "0");
  const total = quantity * price;

  return (
    <>
      <DashNavbar />
      <div className="ticket-page">
        <button className="back-btn" onClick={() => window.history.back()}>
          ←
        </button>

        <div className="ticket-layout">
          <form className="ticket-form" onSubmit={(e) => e.preventDefault()}>
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
              onChange={(e) =>
                setContactInfo({ ...contactInfo, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, email: e.target.value })
              }
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={contactInfo.phone}
              onChange={(e) =>
                setContactInfo({ ...contactInfo, phone: e.target.value })
              }
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
                    onChange={(e) =>
                      handleAttendeeChange(index, "name", e.target.value)
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder={`Email of Ticket ${index + 1}`}
                    value={attendee.email}
                    onChange={(e) =>
                      handleAttendeeChange(index, "email", e.target.value)
                    }
                    required
                  />
                </div>
              ))}
            </div>
          </form>

          <div className="ticket-summary">
            <h2>Summary</h2>
            <p>Price per ticket: {isFree ? "Free" : `${price} SR`}</p>
            <p>Quantity: {quantity}</p>
            <hr />
            <h3>Total: {isFree ? "Free" : `${total} SR`}</h3>
            <button
              className="submit-btn"
              onClick={() => {
                if (!isFormValid() || alreadyRegistered) return;
                setShowModal(true);
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{isFree ? "Confirm Registration" : "Confirm Payment"}</h2>
            <p>
              {isFree
                ? `Register ${quantity} ticket(s) for free.`
                : `You are about to pay ${total} SR for ${quantity} ticket(s).`}
            </p>
            <div className="modal-actions">
              <button
                onClick={async () => {
                  if (!isFree) {
                    try {
                      const stripe = await stripePromise;
                      const res = await axios.post(
                        "http://localhost:5001/api/payments/checkout",
                        {
                          eventTitle: event.title,
                          price,
                          quantity,
                        }
                      );

                      localStorage.setItem(
                        "ticketInfo",
                        JSON.stringify({
                          event,
                          contactInfo,
                          attendees,
                          quantity,
                          total,
                          paymentMethod: "Stripe Checkout",
                          date: new Date().toLocaleDateString("en-GB"),
                          codeBase,
                        })
                      );

                      await stripe.redirectToCheckout({
                        sessionId: res.data.id,
                      });
                    } catch (err) {
                      console.error("Stripe error:", err);
                      alert("Payment failed. Try again.");
                    }
                    return;
                  }

                  // If event is free, continue as usual
                  try {
                    await axios.post("http://localhost:5001/api/tickets", {
                      userId,
                      eventId: event._id,
                      attendees,
                    });

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
                  } catch (err) {
                    console.error("Error registering tickets:", err);
                    alert("Registration failed. Try again.");
                  }
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
