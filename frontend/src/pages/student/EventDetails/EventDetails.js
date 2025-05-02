
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import DashNavbar from "../../../components/DashNavbar";
import "./EventDetails.css";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaTicketAlt,
} from "react-icons/fa";

function EventDetails() {
  const { title } = useParams(); // event title
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [similarEvents, setSimilarEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    navigate("/explore-events");
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/events/title/${title}`);
        setEvent(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event:", err);
        setLoading(false);
      }
    };

    const fetchSimilar = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/events");
        setSimilarEvents(res.data.filter((e) => e.title !== title).slice(0, 3));
      } catch (err) {
        console.error("Error fetching similar events:", err);
      }
    };

    fetchEvent();
    fetchSimilar();
  }, [title]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>Event not found.</p>;

  const isFree = event.price.toLowerCase().includes("free");
  const toUrlSafeTitle = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

  return (
    <>
      <DashNavbar />
      <div className="event-page">
        <button className="back-btn" onClick={handleBack}>
          ←
        </button>

        <div className="event-hero">
          <h4>{event.date?.split("|")[0].trim()}</h4>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
        </div>

        <div className="event-details">
          <div className="event-meta">
            <h2>About Event</h2>
            <div>
              <FaCalendarAlt /> <strong>Date & Time:</strong> <br />
              {event.date}
            </div>
            <div>
              <FaMapMarkerAlt /> <strong>Location:</strong> <br />
              {event.location}
            </div>
            <div>
              <FaClock /> <strong>Duration:</strong> 10 hours
            </div>
            <div>
              <FaTicketAlt /> <strong>Ticket:</strong> Email Ticket
            </div>
            <p>{event.description}</p>
          </div>

          <div className="purchase-box">
            <p className="price-tag">{event.price}</p>
            <Link to={`/purchase/${toUrlSafeTitle(event.title)}`}>
              <button className="ticket-btn">
                {isFree ? "Register Now" : "Buy Ticket"}
              </button>
            </Link>
          </div>
        </div>

        {/* Similar Events */}
        <div className="similar-section">
          <h2>Similar Events</h2>
          <div className="similar-carousel">
            {similarEvents.map((e) => (
              <EventCard
                key={e._id}
                id={e._id}
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

export default EventDetails;
