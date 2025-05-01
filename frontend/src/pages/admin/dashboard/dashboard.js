import React, { useState, useEffect } from "react";
import "./dashboard.css";
import AdminNavbar from "../../../components/AdminNavbar";
import { FaEnvelope, FaCheckCircle, FaTasks, FaSearch } from "react-icons/fa";
import Footer from "../../../components/Footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const [messages, setMessages] = useState(120);
  const [remainingTasks, setRemainingTasks] = useState(30);
  const [requests, setRequests] = useState({ new: 5, pending: 2 });
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for club activity by month
  const data = {
    January: [
      { name: "Technology Club", value: 9 },
      { name: "Art Club", value: 6 },
      { name: "Sports Club", value: 7 },
      { name: "Research Club", value: 8 },
      { name: "Innovation Club", value: 5 },
    ],
    February: [
      { name: "Technology Club", value: 8 },
      { name: "Art Club", value: 7 },
      { name: "Sports Club", value: 6 },
      { name: "Research Club", value: 9 },
      { name: "Innovation Club", value: 6 },
    ],
    March: [
      { name: "Technology Club", value: 6 },
      { name: "Art Club", value: 5 },
      { name: "Sports Club", value: 8 },
      { name: "Research Club", value: 7 },
      { name: "Innovation Club", value: 8 },
    ],
  };

  useEffect(() => {
    // Simulate fetching data
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredClubs = () => {
    // Filtering logic can be added here for club searching
    return [];
  };

  return (
    <div className="dashboard-container">
      <AdminNavbar />
      <div className="page-content">
        <h1>Hello Funoon!</h1>

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <FaEnvelope className="card-icon" size={40} />
            <h3>Messages</h3>
            <p>{messages} New</p>
            <button className="view-btn">View Messages</button>
          </div>
          <div className="card">
            <FaCheckCircle className="card-icon" size={40} />
            <h3>Remaining Tasks</h3>
            <p>{remainingTasks}</p>
            <button className="view-btn">View Tasks</button>
          </div>
          <div className="card">
            <FaTasks className="card-icon" size={40} />
            <h3>Requests</h3>
            <p>{requests.new} New, {requests.pending} Pending</p>
            <button className="view-btn">Process All Requests</button>
          </div>
        </div>

        {/* Month Selector */}
        <div className="month-selector">
          <label>Select Month:</label>
          <select onChange={handleMonthChange} value={selectedMonth}>
            {Object.keys(data).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Clubs Activity Graph */}
        <div className="chart-container">
          <h2>Clubs Activity in {selectedMonth}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data[selectedMonth]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {/* Changed color of the chart line */}
              <Line type="monotone" dataKey="value" stroke="#1D59A5" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" size={20} />
        </div>

        {/* Clubs Table */}
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
            {filteredClubs().length > 0 ? (
              filteredClubs().map((club) => (
                <tr key={club.id}>
                  <td>{club.name}</td>
                  <td>{club.category}</td>
                  <td>{club.phone}</td>
                  <td>{club.email}</td>
                  <td>{club.members}</td>
                  <td>
                    <span className={`status-badge ${club.status === "Active" ? "status-active" : "status-inactive"}`}>
                      {club.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">{club.status === "Active" ? "Deactivate" : "Activate"}</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No clubs found
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
