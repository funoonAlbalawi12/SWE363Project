import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClubAdminNavBar from "../../../components/ClubAdminNavBar2";
import Footer from "../../../components/Footer";
import "./ClubAdminDashboard.css";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function ClubAdminDashboard() {
  const navigate = useNavigate();
  const [clubInfo, setClubInfo] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [membersData, setMembersData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [clubRes, eventsRes, membersRes] = await Promise.all([
          fetch("http://localhost:5001/api/clubadmin/my-club", { headers }),
          fetch("http://localhost:5001/api/clubadmin/my-events", { headers }),
          fetch("http://localhost:5001/api/clubadmin/recent-members", { headers }),
        ]);

        const club = await clubRes.json();
        const events = await eventsRes.json();
        const members = await membersRes.json();

        console.log("📦 Dashboard Loaded:");
        console.log("✅ clubData:", club);
        console.log("✅ eventsData:", events);
        console.log("✅ membersData:", members);

        setClubInfo(club);
        setEventsData(events);
        setMembersData(members);
      } catch (error) {
        console.error("❌ Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="club-admin-dashboard">
      <ClubAdminNavBar />
      <div className="dashboard-content">
        <div className="header-container">
          <img src={clubInfo?.image || "/ieom-logo.jpg.jpg"} alt="Club Logo" className="club-logo" />
          <h2 className="greeting">
            {clubInfo ? `Hello, ${clubInfo.name} Admin!` : "Hello, Admin!"}
          </h2>
        </div>

        {/* Recent Events */}
        <div className="section">
          <div className="section-header">
            <h3>Recent Events</h3>
            <button onClick={() => navigate("/clubadmin/Events")}>View all</button>
          </div>

          <div className="card-list">
            {eventsData.length > 0 ? (
              eventsData.map((event) => (
                <div className="card" key={event._id}>
                  <div className="card-body">
                    <h4>{event.title}</h4>
                    <p className="sub">{clubInfo?.name}</p>
                    <p><FaCalendarAlt /> {event.date}</p>
                    <p><FaMapMarkerAlt /> {event.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </div>

        {/* Members */}
        <div className="section">
          <div className="section-header">
            <h3>Members</h3>
            <button onClick={() => navigate("/clubadmin/members")}>View all</button>
          </div>

          <div className="card-list">
            {membersData.length > 0 ? (
              membersData.map((member) => (
                <div className="card" key={member._id}>
                  <div className="card-body">
                    <h4>{member.name}</h4>
                    <p className="sub">{clubInfo?.name}</p>
                    <p>Joined: {new Date(member.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No members found.</p>
            )}
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
