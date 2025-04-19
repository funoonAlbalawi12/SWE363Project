import React, { useEffect, useRef, useState } from 'react';
import ClubAdminNavbar from '../../../components/ClubAdminNavBar2';
import Footer from '../../../components/Footer';
import './Events.css';
import { getEvents } from '../../../data/ClubEvents';
import AnnouncementsEvents from '../Announcements/AnnouncementsEvents';
import { useLocation } from 'react-router-dom';

function EventsPage() {
  const [events, setEvents] = useState(getEvents()); 
  const location = useLocation();
  const manageRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollToManage && manageRef.current) {
      manageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  
  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
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
                <div key={event.id} className="event-card">
                  <h4>{event.title}</h4>
                  <p className="event-sub">{event.date} | {event.location}</p>
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
