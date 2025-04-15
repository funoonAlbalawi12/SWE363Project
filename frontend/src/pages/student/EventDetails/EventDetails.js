import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import events from "../../../data/EventData";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import DashNavbar from "../../../components/DashNavbar";
import "./EventDetails.css";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";

function EventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/explore-events");
  };

  const event = events.find(
    (e) => e.title.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
  );

  if (!event) {
    return <p>Event not found.</p>;
  }

  const isFree = event.price.toLowerCase().includes("free");

  return (
    <>
      <DashNavbar />
      <div className="event-page">
        <button className="back-btn" onClick={handleBack}>
          ←
        </button>

        <div className="event-hero">
          <h4>{event.date.split("|")[0].trim()}</h4>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
        </div>

        <div className="event-details">
          <div className="event-meta">
            <div>
              <FaCalendarAlt /> <strong>Date & Time:</strong> <br />
              {event.date}
            </div>
            <div>
              <FaMapMarkerAlt /> <strong>Location:</strong> <br />
              {event.location}
            </div>
          </div>

          <div className="purchase-box">
            <p className="price-tag">{event.price}</p>

            <Link
              to={`/purchase/${event.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <button className="ticket-btn">"Register Now"</button>
            </Link>
          </div>
        </div>

        {/* About event */}
        <div className="about-section">
          <h2>About Event</h2>
          <div className="about-meta">
            <div>
              <FaClock /> <strong>Duration:</strong> 10 hours
            </div>
            <div>
              <FaTicketAlt /> <strong>Ticket:</strong> Email Ticket
            </div>
          </div>
          <p>{event.description}</p>
        </div>

        {/* Event album */}
        {/* <div className="album-section">
          <h2>The latest event's album</h2>
          <div className="album-grid">
            {(event.albumImages || [1, 2, 3, 4, 5]).map((img, i) => (
              <div key={i} className="album-image" />
            ))}
          </div>
        </div> */}

        {/* Similar Events */}
        <div className="similar-section">
          <h2>Similar Events</h2>
          <div className="similar-carousel">
            {events
              .filter((e) => e.title !== event.title)
              .slice(0, 3)
              .map((e, idx) => (
                <EventCard
                  key={idx}
                  title={e.title}
                  price={e.price}
                  date={e.date}
                  location={e.location}
                  img={e.img}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EventPage;
