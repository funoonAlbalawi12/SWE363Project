import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import clubs from "../../../data/ClubData";
import Footer from "../../../components/Footer";
import "./ClubProfile.css";
import DashNavbar from "../../../components/DashNavbar";
import EventCard from "../../../components/EventCard";

function ClubProfile() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1); // to go back to previous page

  const { clubId } = useParams();
  const club = clubs[clubId];
  const { socialLinks = [] } = club;

  if (!club) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Club not found.</h2>
      </div>
    );
  }

  return (
    <>
      <DashNavbar />
      <div className="club-profile">
        <div className="club-header-actions">
          <button className="back-btn" onClick={handleBack}>
            ←
          </button>
        </div>
        <div className="club-hero">
          <h1>{club.name}</h1>
          <p>
            To receive our latest updates and announcements please click
            subscribe.
          </p>
          <button className="subscribe-btn">Subscribe</button>
        </div>

        <div className="club-info-section">
          <div className="about">
            <h2>About us</h2>
            <h4>Overview</h4>
            <p>{club.overview}</p>
            <h4>Vision</h4>
            <p>{club.vision}</p>
            <h4>Mission</h4>
            <p>{club.mission}</p>
          </div>

          <div className="album">
            <h2>The latest event's album</h2>
            <div className="album-grid">
              {club.albumImages.length > 0 ? (
                club.albumImages.map((_, idx) => (
                  <div key={idx} className="album-img-placeholder" />
                ))
              ) : (
                <p>No album images available yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="events-section">
          <h2>Upcoming events</h2>
          <div className="events-carousel">
            {club.events.length > 0 ? (
              club.events.map((event, idx) => (
                <EventCard
                  key={idx}
                  title={event.title}
                  subtitle={event.subtitle}
                  price={event.price}
                  date={event.date}
                  location={event.location}
                  img={event.img}
                />
              ))
            ) : (
              <p>No upcoming events at this time.</p>
            )}
          </div>
        </div>

        <div className="apply-section">
          <p>Join us now and be part of an exciting community!</p>
          <button className="membership-btn" onClick={() => setShowForm(true)}>
            Apply for membership
          </button>
        </div>
        {showForm && (
          <div className="application-form-overlay">
            <div className="application-form">
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ×
              </button>
              <h3>
                You are applying to join {club.name}. Please fill the form:
              </h3>
              <form>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                <input type="text" placeholder="Phone Number" />
                <input type="text" placeholder="Student ID" />
                <input type="text" placeholder="Major / Department" />
                <input type="text" placeholder="Current Year / Level" />
                <input type="text" placeholder="Why do you want to join?" />
                <input type="text" placeholder="Skills / Experience" />
                <input type="text" placeholder="Availability (days/time)" />

                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="social-section">
          <h2>Follow us on</h2>
          <div className="social-icons">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title={link.name}
              >
                <img src={link.icon} alt={link.name} />
              </a>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ClubProfile;
