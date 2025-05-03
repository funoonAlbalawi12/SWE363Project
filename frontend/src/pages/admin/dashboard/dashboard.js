import React, { useState } from "react";
import "./dashboard.css";
import AdminNavbar from "../../../components/AdminNavbar";
import { Search } from "lucide-react";
import Footer from "../../../components/Footer";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const summaryData = [
    { title: "Messages", value: "120 New", icon: "📩", action: "View Messages", route: "/messages" },
    { title: "Remaining Tasks", value: 30, icon: "✔️", action: "View Tasks", route: "/tasks" },
    { title: "Requests", value: "5 New, 2 Pending", icon: "📋", action: "Process All Requests", route: "/requests" },
  ];

  const initialClubs = [
    { id: 1, name: "Club1", category: "Technology", phone: "0565700135", email: "club1@example.com", members: 7, status: "Active" },
    { id: 2, name: "Club2", category: "Research", phone: "0565700136", email: "club2@example.com", members: 9, status: "Inactive" },
    { id: 3, name: "Club3", category: "Art", phone: "0565700137", email: "club3@example.com", members: 16, status: "Inactive" },
    { id: 4, name: "Club4", category: "Innovation", phone: "0565700138", email: "club4@example.com", members: 10, status: "Active" },
    { id: 5, name: "Club5", category: "Technology", phone: "0565700139", email: "club5@example.com", members: 11, status: "Active" },
    { id: 6, name: "Club6", category: "Sport", phone: "0565700140", email: "club6@example.com", members: 5, status: "Inactive" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const filteredClubs = initialClubs.filter((club) => club.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Data for charts
  const activityData = [
    { name: "Technology Club", value: 9 },
    { name: "Art Club", value: 6 },
    { name: "Sports Club", value: 7 },
    { name: "Research Club", value: 8 },
    { name: "Innovation Club", value: 5 },
  ];

  const budgetData = [
    { name: "Technology Club", planned: 900, actual: 1200 },
    { name: "Art Club", planned: 600, actual: 800 },
    { name: "Sports Club", planned: 1000, actual: 1400 },
    { name: "Research Club", planned: 800, actual: 1000 },
    { name: "Innovation Club", planned: 750, actual: 950 },
  ];

  return (
    <div className="dashboard-container">
      <AdminNavbar />
      <div className="page-content">
        <h1>Hello Admin!</h1>

        <div className="summary-cards">
          {summaryData.map((item, idx) => (
            <div className="card_admin" key={idx}>
              <h3>{item.icon} {item.title}</h3>
              <p>{item.value}</p>
              {/* Button for navigating to specific functionality */}
              <button className="action-btn" onClick={() => navigate(item.route)}>
                {item.action}
              </button>
            </div>
          ))}
        </div>

        {/* Month Selector */}
        <div className="month-selector">
          <label>Select Month:</label>
          <select onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
          </select>
        </div>

        {/* Clubs Activity Chart */}
        <div className="chart-container">
          <h2>Clubs Activity in {searchQuery || "January"}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#1E90FF" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Spending Chart */}
        <div className="chart-container">
          <h2>Budget Spending by Club in {searchQuery || "January"}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name, props) => `${name}: ${value}`} />
              <Bar dataKey="planned" fill="#1E3A8A" barSize={25} /> {/* Blue for planned */}
              <Bar dataKey="actual" fill="#2563EB" barSize={25} /> {/* Light blue for actual */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Search Bar */}
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
                      className={`status-badge ${club.status === "Active" ? "status-active" : "status-inactive"}`}
                    >
                      {club.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">
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
