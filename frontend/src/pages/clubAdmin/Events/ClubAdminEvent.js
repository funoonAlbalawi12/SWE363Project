import React, { useEffect, useRef, useState } from 'react';
import ClubAdminNavbar from '../../../components/ClubAdminNavBar2';
import Footer from '../../../components/Footer';
import './Events.css';
import AnnouncementsEvents from '../Announcements/AnnouncementsEvents';
import { useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const manageRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5001/api/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("❌ Failed to load events:", err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (location.state?.scrollToManage && manageRef.current) {
      manageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const handleAddEvent = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  return (
    <div className="events-page-wrapper">
      <ClubAdminNavbar />

      <div className="events-main-content">
        {/* Section 1: Upcoming Events */}
        <section className="events-section">
          <h2 className="section-title">Upcoming Events</h2>

          {events.length === 0 ? (
            <p className="empty-msg">No upcoming events yet.</p>
          ) : (
            <div className="events-card-list">
              {events.map(event => (
                <div key={event._id} className="event-card">
                  <h4>{event.title}</h4>
                  <p><FaCalendarAlt /> {event.date}</p>
                  <p><FaMapMarkerAlt /> {event.location}</p>
                  <p>{event.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Divider */}
        <hr className="divider" />

        {/* Section 2: Create/Announce Event */}
        <div ref={manageRef}>
          <section className="announce-section">
            <h2 className="section-title">Create New Event</h2>
            <AnnouncementsEvents onAddEvent={handleAddEvent} />
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default EventsPage;