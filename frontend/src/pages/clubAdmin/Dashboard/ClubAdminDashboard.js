import React from "react";
import { useNavigate } from "react-router-dom";
import ClubAdminNavBar from "../../../components/ClubAdminNavBar2";
import Footer from "../../../components/Footer";
import "./ClubAdminDashboard.css";

function ClubAdminDashboard() {
  const navigate = useNavigate();

  const recentEvents = [
    {
      id: 1,
      title: "Chemical Engineering Introduction",
      club: "IEOM KFUPM Chapter",
      date: "Wednesday, June 7 | 07:00 PM",
      location: "Building 4, Room 124",
    },
    {
      id: 2,
      title: "Meet ICS Dean",
      club: "IEOM KFUPM Chapter",
      date: "Sunday, February 20 | 08:00 PM",
      location: "Building 4, Room 123",
    },
  ];

  const members = [
    {
      id: 1,
      name: "Sami AlDossari",
      joined: "February 20 | 08:00 PM",
      club: "IEOM KFUPM Chapter",
    },
    {
      id: 2,
      name: "Fatimah AlYami",
      joined: "June 7 | 07:00 PM",
      club: "IEOM KFUPM Chapter",
    },
  ];

  return (
    <div className="club-admin-dashboard">
      <ClubAdminNavBar />
      <div className="dashboard-content">
        <h2 className="greeting">Hello, IEOM KFUPM Chapter Admin!</h2>

        {/* Recent Events */}
        <div className="section">
          <div className="section-header">
            <h3>Recent Events</h3>
            <button onClick={() => navigate("/clubadmin/Events")}>View all</button>
          </div>

          <div className="card-list">
            {recentEvents.map((event) => (
              <div className="card" key={event.id}>
                <div className="card-body">
                  <h4>{event.title}</h4>
                  <p className="sub">{event.club}</p>
                  <p>{event.date}</p>
                  <p>{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Members */}
        <div className="section">
          <div className="section-header">
            <h3>Members</h3>
            <button onClick={() => navigate("/clubadmin/club-members")}>View all</button>
          </div>

          <div className="card-list">
            {members.map((member) => (
              <div className="card" key={member.id}>
                <div className="card-body">
                  <h4>{member.name}</h4>
                  <p className="sub">{member.club}</p>
                  <p>Joined: {member.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Tools */}
        <div className="section">
          <div className="section-header">
            <h3>Admin Tools</h3>
          </div>

          <div className="tool-card-list">
            <div className="tool-card">
              <h4>Manage Club Profile</h4>
              <p>Edit club name, logo, description, and contact info.</p>
              <button onClick={() => navigate("/clubadmin/profile/edit")}>Go to Profile</button>
            </div>

            <div className="tool-card">
              <h4>Membership Requests</h4>
              <p>Approve or reject student applications to your club.</p>
              <button onClick={() => navigate("/clubadmin/members", { state: { scrollTo: "membership" } })}>Manage Requests</button>
            </div>

            <div className="tool-card">
              <h4>Manage Events</h4>
              <p>Schedule upcoming events.</p>
              <button onClick={() => navigate("/clubadmin/Events", { state: { scrollToManage: true } })}>
                Create / View Events
              </button>
            </div>

            <div className="tool-card">
              <h4>Manage Club Members</h4>
              <p>View all active members, remove, or assign admin roles.</p>
              <button onClick={() => navigate("/clubadmin/members", { state: { scrollToManage: true } })}>Manage Members</button>
            </div>

            <div className="tool-card">
              <h4>Messaging & Announcements</h4>
              <p>Send a custom message or announcement to your club members.</p>
              <button onClick={() => navigate("/clubadmin/messages")}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ClubAdminDashboard;