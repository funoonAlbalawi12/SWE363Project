import React, { useState } from 'react';
import './AnnouncementsEvents.css';

function AnnouncementsEvents({ onAddEvent }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
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

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication error: No token found.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, date, location }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Event scheduled successfully!");
        if (onAddEvent) {
          onAddEvent(data); // Updates UI in ClubAdminEvent.js
        }
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
      } else {
        setMessage(`❌ Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      setMessage("❌ Server error. Please check your console.");
    }
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
