

import React, { useEffect, useState } from "react";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import DashNavbar from "../../../components/DashNavbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Dashboard.css";
import API from "../../../axios";

function Dashboard() {
  const [memberships, setMemberships] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [allEvents, setAllEvents] = useState([]);
  const [showMemberships, setShowMemberships] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const fetchMemberships = async () => {
      try {
        const res = await API.get(`/api/clubmemberships/user?userId=${userId}`);
        setMemberships(res.data);
      } catch (err) {
        console.error("Failed to fetch memberships", err);
      }
    };

    const fetchUserEvents = async () => {
      try {
        const res = await API.get(`/api/tickets?userId=${userId}`);
        setRegisteredEvents(res.data); // array of tickets
      } catch (err) {
        console.error("Failed to fetch registered events", err);
      }
    };
    const fetchEvents = async () => {
      try {
        const res = await API.get("/api/events");
        setAllEvents(res.data); // All events in the system
      } catch (err) {
        console.error("Failed to fetch all events", err);
      }
    };

    fetchMemberships();
    fetchEvents();
    fetchUserEvents();
  }, []);

  return (
    <div className="dashboard">
      <DashNavbar />
      <div className="dashboard-content">
        <h2 className="greeting">Hello!</h2>

        {/* Events Section */}
        <div className="section-header">
          <h3>Your Events</h3>
        </div>
        <div className="events-clubs-section">
          <div className="your-events">
            {registeredEvents.length === 0 ? (
              <p>No registered events.</p>
            ) : (
              registeredEvents
                .slice(0, 2)
                .map((e, i) => (
                  <EventCard
                    key={i}
                    title={e.eventId?.title}
                    price={e.eventId?.price}
                    date={e.eventId?.date}
                    location={e.eventId?.location}
                    img={e.eventId?.img}
                  />
                ))
            )}
          </div>

          <div className="your-clubs">
            <h3>Your Clubs</h3>
            <div className="filter-buttons">
              <button
                className={statusFilter === "all" ? "active" : ""}
                onClick={() => {
                  setStatusFilter("all");
                  setShowMemberships(true);
                }}
              >
                All
              </button>
              <button
                className={statusFilter === "pending" ? "active" : ""}
                onClick={() => {
                  setStatusFilter("pending");
                  setShowMemberships(true);
                }}
              >
                Pending
              </button>
              <button
                className={statusFilter === "accepted" ? "active" : ""}
                onClick={() => {
                  setStatusFilter("accepted");
                  setShowMemberships(true);
                }}
              >
                Accepted
              </button>
              <button
                className={statusFilter === "rejected" ? "active" : ""}
                onClick={() => {
                  setStatusFilter("rejected");
                  setShowMemberships(true);
                }}
              >
                Rejected
              </button>
            </div>

            {memberships
              .filter(
                (m) => statusFilter === "all" || m.status === statusFilter
              )
              .map((m, idx) => (
                <div key={idx} className="user-club-card">
                  <div className="user-club-name">{m.clubId?.name}</div>
                  <div className="user-club-role">
                    {m.status === "accepted" && m.role ? (
                      <span>{m.role}</span>
                    ) : (
                      <span className={`status-badge ${m.status}`}>
                        {m.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Similar Events Carousel */}
        <div className="similar-events">
          <h3>Similar Events</h3>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay={false}
            interval={4000}
            showArrows={true}
            className="similar-carousel"
          >
            {allEvents.length > 0 &&
              allEvents
                .filter(
                  (e) =>
                    !registeredEvents.some(
                      (r) => r.eventId && r.eventId._id === e._id
                    )
                )
                .map((event, index) => (
                  <div className="carousel-slide" key={index}>
                    <EventCard
                      title={event.title}
                      price={event.price}
                      date={event.date}
                      location={event.location}
                      img={event.img}
                    />
                  </div>
                ))}
          </Carousel>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
