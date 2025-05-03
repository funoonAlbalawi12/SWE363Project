import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function ClubEventCard({ id, title, subtitle, price, date, location }) {
  const toUrlSafeTitle = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  return (
    <Link to={`/event/${toUrlSafeTitle(title)}`} className="main-event-card-link">
      <div className="main-event-card no-image">
        <div className="main-event-info">
          <div className="main-event-header">
            <h3>{title}</h3>
            <p className="price">{price || "Free"}</p>
          </div>
          {subtitle && <p className="main-event-subtitle">{subtitle}</p>}
          <p>
            <FaCalendarAlt style={{ marginRight: "6px" }} /> {date}
          </p>
          <p>
            <FaMapMarkerAlt style={{ marginRight: "6px" }} /> {location}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ClubEventCard;
