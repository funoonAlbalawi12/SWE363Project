import React from "react";
//import "./dash.css";

function Dashboard() {
  const summaryData = [
    { title: "Active Users", value: 120 },
    { title: "Club Registrations", value: 45 },
    { title: "System Uptime", value: "99.98%" },
    { title: "Error Logs", value: 3 },
  ];

  const userActivity = [
    {
      id: 1,
      username: "user123",
      activity: "Login Attempt",
      time: "2025-04-16 08:30",
      status: "Success",
    },
    {
      id: 2,
      username: "user456",
      activity: "Registered for Event A",
      time: "2025-04-15 19:10",
      status: "Registered",
    },
    {
      id: 3,
      username: "user789",
      activity: "Suspicious Login",
      time: "2025-04-15 22:45",
      status: "Failed",
    },
  ];

  const suspendUser = (username) => {
    alert(`Suspended account: ${username}`);
    // integrate with backend suspension API here
  };

  return (
    <div className="dashboard-container">
      <h1>System Dashboard</h1>

      <div className="summary-cards">
        {summaryData.map((item, idx) => (
          <div className="card" key={idx}>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <h2>User Activity</h2>
      <table className="activity-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Activity</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userActivity.map((log) => (
            <tr key={log.id}>
              <td>{log.username}</td>
              <td>{log.activity}</td>
              <td>{log.time}</td>
              <td>{log.status}</td>
              <td>
                <button
                  className="suspend-btn"
                  onClick={() => suspendUser(log.username)}
                >
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
