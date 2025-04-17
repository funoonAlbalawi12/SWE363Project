import React from "react";
import "./dashboard.css"; // تأكد من أن الملف موجود في نفس المسار
import AdminNavbar from "../../../components/AdminNavbar";

function AdminDashboard() {
  const summaryData = [
    { title: "Active Users", value: 100 },
    { title: "Club Registrations", value: 100 },
    { title: "Uptime", value: "80%" },
  ];

  const clubsData = [
    {
      id: 1,
      name: "Club 1",
      category: "Technology",
      phone: "0565700135",
      email: "club1@example.com",
      members: 7,
      status: "Active",
    },
    {
      id: 2,
      name: "Club 2",
      category: "Research",
      phone: "0565700136",
      email: "club2@example.com",
      members: 9,
      status: "Inactive",
    },
    {
      id: 3,
      name: "Club 3",
      category: "Art",
      phone: "0565700137",
      email: "club3@example.com",
      members: 16,
      status: "Inactive",
    },
    {
      id: 4,
      name: "Club 4",
      category: "Innovation",
      phone: "0565700138",
      email: "club4@example.com",
      members: 10,
      status: "Active",
    },
    {
      id: 5,
      name: "Club 5",
      category: "Technology",
      phone: "0565700139",
      email: "club5@example.com",
      members: 11,
      status: "Active",
    },
    {
      id: 6,
      name: "Club 6",
      category: "Sport",
      phone: "0565700140",
      email: "club6@example.com",
      members: 5,
      status: "Inactive",
    },
  ];

  return (
    <div className="dashboard-container">
      <AdminNavbar>
        
      </AdminNavbar>
      <h1>System Dashboard</h1>

      <div className="summary-cards">
        {summaryData.map((item, idx) => (
          <div className="card" key={idx}>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
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
          {clubsData.map((club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.category}</td>
              <td>{club.phone}</td>
              <td>{club.email}</td>
              <td>{club.members}</td>
              <td>{club.status}</td>
              <td>
                <button
                  className="action-btn"
                  style={{
                    backgroundColor: club.status === "Active" ? "#059669" : "#ef4444",
                  }}
                >
                  {club.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 KFUPM Activity Network. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AdminDashboard;
