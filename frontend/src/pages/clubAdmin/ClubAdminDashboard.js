import React from "react";

export default function ClubAdminDashboard() {
  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "sans-serif",
        backgroundColor: "#f2f4f8",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}
      >
        Club Admin Dashboard
      </h2>

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {quickStats.map(({ label, value }, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "16px",
              borderRadius: "12px",
              background: "#fff",
            }}
          >
            <p style={{ color: "gray", fontSize: "14px" }}>{label}</p>
            <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</h3>
          </div>
        ))}
      </div>

      {/* Action Shortcuts and Recent Activity */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "12px",
            background: "#f9f9f9",
          }}
        >
          <h4
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Quick Actions
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <button style={buttonStyle}>+ New Event</button>
            <button style={buttonStyle}>🖼 Upload Gallery</button>
            <button style={buttonStyle}>👥 Manage Members</button>
            <button style={buttonStyle}>✏️ Edit Club Profile</button>
          </div>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "16px",
            borderRadius: "12px",
            background: "#f9f9f9",
          }}
        >
          <h4
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Recent Activity
          </h4>
          <ul style={{ fontSize: "14px", color: "#555", paddingLeft: "20px" }}>
            <li>Event "Tech Talk" created on April 12</li>
            <li>3 new members joined</li>
            <li>Uploaded 6 images to "Spring Festival"</li>
            <li>Received collaboration request from AI Club</li>
          </ul>
        </div>
      </div>

      {/* Upcoming Events */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#fff",
          padding: "16px",
        }}
      >
        <h4
          style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}
        >
          Upcoming Events
        </h4>
        <ul style={{ fontSize: "14px", color: "#555", paddingLeft: "20px" }}>
          <li>April 20 - Coding Bootcamp</li>
          <li>April 27 - Sustainability Awareness Day</li>
          <li>May 5 - Photography Workshop</li>
        </ul>
      </div>
    </div>
  );
}

const quickStats = [
  { label: "Total Events", value: 12 },
  { label: "Club Members", value: 53 },
  { label: "Pending Requests", value: 5 },
  { label: "Photos Uploaded", value: 37 },
];

const buttonStyle = {
  padding: "8px 12px",
  fontSize: "14px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
