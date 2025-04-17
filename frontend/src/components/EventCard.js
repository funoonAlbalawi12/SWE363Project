import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function EventCard({ title, subtitle, price, date, location, img }) {
  return (
    <Link
      to={`/events/${title.toLowerCase().replace(/\s+/g, "-")}`}
      className="event-card-link"
    >
      <div className="event-card">
        <div className="event-image">
          <img src={img} alt="Event" />
        </div>
        <div className="event-info">
          <div className="event-header">
            <h3>{title}</h3>
            <p className="price">{price || "Free"}</p>
          </div>
          {subtitle && <p className="event-subtitle">{subtitle}</p>}
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
