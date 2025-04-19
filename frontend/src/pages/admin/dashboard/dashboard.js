import React, { useState } from "react";
import "./dashboard.css";
import AdminNavbar from "../../../components/AdminNavbar";
import { Search } from "lucide-react";
import Footer from "../../../components/Footer";

function AdminDashboard() {
  const summaryData = [
    { title: "Active Users", value: 100 },
    { title: "Club Registrations", value: 100 },
    {
      title: "Uptime",
      value: "80%",
      isUptime: true, // flag to show progress bar
    },
  ];

  const initialClubs = [
    {
      id: 1,
      name: "Club1",
      category: "Technology",
      phone: "0565700135",
      email: "club1@example.com",
      members: 7,
      status: "Active",
    },
    {
      id: 2,
      name: "Club2",
      category: "Research",
      phone: "0565700136",
      email: "club2@example.com",
      members: 9,
      status: "Inactive",
    },
    {
      id: 3,
      name: "Club3",
      category: "Art",
      phone: "0565700137",
      email: "club3@example.com",
      members: 16,
      status: "Inactive",
    },
    {
      id: 4,
      name: "Club4",
      category: "Innovation",
      phone: "0565700138",
      email: "club4@example.com",
      members: 10,
      status: "Active",
    },
    {
      id: 5,
      name: "Club5",
      category: "Technology",
      phone: "0565700139",
      email: "club5@example.com",
      members: 11,
      status: "Active",
    },
    {
      id: 6,
      name: "Club6",
      category: "Sport",
      phone: "0565700140",
      email: "club6@example.com",
      members: 5,
      status: "Inactive",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredClubs = initialClubs.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <AdminNavbar />
      <div className="page-content">
        <h1>Hello Khulud!</h1>

        <div className="summary-cards">
          {summaryData.map((item, idx) => (
            <div
              className={`card_admin ${item.isUptime ? "uptime-card" : ""}`}
              key={idx}
            >
              <h3>{item.title}</h3>
              <p>{item.value}</p>
              {item.isUptime && (
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: item.value,
                    }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <h2>All Clubs</h2>
        <table className="clubs-table">
          <thead>
            <tr>
              <th>Club Name</th>
              <th>Category</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Members Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClubs.length > 0 ? (
              filteredClubs.map((club) => (
                <tr key={club.id}>
                  <td>{club.name}</td>
                  <td>{club.category}</td>
                  <td>{club.phone}</td>
                  <td>{club.email}</td>
                  <td>{club.members}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        club.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      {club.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn"
                      style={{
                        backgroundColor:
                          club.status === "Active"
                            ? "action-btn"
                            : "action-btn",
                      }}
                    >
                      {club.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Club not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
