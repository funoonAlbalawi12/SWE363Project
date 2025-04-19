import React, { useState } from 'react';
import './AnnouncementsEvents.css';
import { addEvent } from '../../../data/ClubEvents';

function AnnouncementsEvents({ onAddEvent }) {
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

    const newEvent = {
      id: Date.now(),
      title,
      description,
      date,
      location,
    };

    addEvent(newEvent); 
    if (onAddEvent) {
      onAddEvent(newEvent); 
    }

    setMessage('Event scheduled successfully!');
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
  };

  return (
    <div className="announcements-events">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's the event about?"
        />

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Location:</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Building 4, Room 101"
        />

        <button type="submit">Publish</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AnnouncementsEvents;
