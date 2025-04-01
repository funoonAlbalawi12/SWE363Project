import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function EventCard({ title, price, date, location, img }) {
  return (
    <div className="event-card">
      <div className="event-image">
        <img src={img} alt="Event" />
      </div>
      <div className="event-info">
        <div className="event-header">
          <h3>{title}</h3>
          <p className="price">{price}</p>
        </div>
        <p>
          <FaCalendarAlt /> {date}
        </p>
        <p>
          <FaMapMarkerAlt /> {location}
        </p>
      </div>
    </div>
  );
}

export default EventCard;
