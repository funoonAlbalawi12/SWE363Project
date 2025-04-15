import React, { useState } from 'react';
import './AnnouncementsEvents.css';

function AnnouncementsEvents() {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !date || !location) {
      setMessage('All fields are required.');
      return;
    }

    const selectedDate = new Date(date);
    const now = new Date();

    if (selectedDate <= now) {
      setMessage('Event date must be in the future.');
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title,
      description,
      date,
      location,
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setMessage('✅ Event scheduled successfully!');
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
  };

  return (
    <div className="announcements-events">
      <h2>Create New Announcement / Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Location:</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} />

        <button type="submit">Publish</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h3>Posted Announcements & Events</h3>
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        announcements.map((item) => (
          <div className="event-card" key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <p><strong>Location:</strong> {item.location}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AnnouncementsEvents;
