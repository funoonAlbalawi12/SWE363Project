import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEye, FaArrowLeft } from "react-icons/fa"; // Icons for actions
import "./messages.css"; // Import your CSS file
import AdminNavbar from "../../../components/AdminNavbar";

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);

  // Simulate message data fetching
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // If you have an actual API endpoint, replace this with axios call.
        const response = await axios.get("/api/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // Sample messages for demonstration
    const sampleMessages = [
      {
        id: 1,
        sender: "Sam (Contractor)",
        subject: "Meeting Availability",
        body: "Hey Rachel, I hope you're doing well! I've tried to call but with no luck! Are you still available to attend our meeting?",
        date: new Date().toISOString(),
      },
      {
        id: 2,
        sender: "Rachel (Manager)",
        subject: "Re: Meeting",
        body: "Hi Sam, I am available after 3 PM today. Let me know if that works for you!",
        date: new Date().toISOString(),
      },
    ];

    setMessages(sampleMessages); // Use sample data when no API is available
    // fetchMessages(); // Uncomment this line when you have real API
  }, []);

  // Back Button Handler
  const handleBackClick = () => {
    // Replace with actual logic for navigating back
    window.history.back();
  };

  return (
    <div className="page-container">
      <div className="messages-header">
        <FaArrowLeft className="back-arrow" onClick={handleBackClick} />
        
        <h2 className="page-title">Messages</h2>
      </div>

      <div className="message-list">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div className="message-card" key={message.id}>
              <div className="message-header">
                <div className="message-sender">{message.sender}</div>
                <div className="message-date">
                  {new Date(message.date).toLocaleDateString()}
                </div>
              </div>

              <div className="message-content">
                <strong>{message.subject}</strong>
                <p>{message.body}</p>
              </div>

              <div className="message-actions">
                <button
                  className="action-btn"
                  onClick={() => alert(`Viewing message: ${message.id}`)}
                >
                  <FaEye /> View
                </button>
                <button
                  className="action-btn"
                  onClick={() => alert(`Deleting message: ${message.id}`)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-messages">No messages found</div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
