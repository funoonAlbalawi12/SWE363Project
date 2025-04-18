import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function EventCard({ title, subtitle, price, date, location, img }) {
  return (
    <Link
      to={`/events/${title.toLowerCase().replace(/\s+/g, "-")}`}
      className="main-event-card-link"
    >
      <div className="main-event-card">
        <div className="main-event-image">
          <img src={img} alt="Event" />
        </div>
        <div className="main-event-info">
          <div className="main-event-header">
            <h3>{title}</h3>
            <p className="price">{price || "Free"}</p>
          </div>
          {subtitle && <p className="main-event-subtitle">{subtitle}</p>}
          <p>
            <FaCalendarAlt /> {date}
          </p>
          <p>
            <FaMapMarkerAlt /> {location}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
