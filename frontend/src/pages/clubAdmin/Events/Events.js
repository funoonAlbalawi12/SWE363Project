import React from 'react';
import './Events.css';

function EventsPage() {
  const events = [
    {
      id: 1,
      title: 'Hackathon 2025',
      description: '48-hour coding challenge open to all KFUPM students.',
      date: 'March 10, 2025',
      location: 'Building 11, Innovation Lab',
    },
    {
      id: 2,
      title: 'AI & Society Talk',
      description: 'Discussion on the impact of AI in modern life.',
      date: 'March 15, 2025',
      location: 'Auditorium 5, Building 54',
    },
  ];

  return (
    <div className="events-page-container">
      <h2 className="events-heading">Upcoming Events</h2>

      <div className="events-card-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h4>{event.title}</h4>
            <p className="event-sub">{event.date} |  {event.location}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
