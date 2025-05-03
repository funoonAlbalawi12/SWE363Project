import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import "./ClubProfile.css";
import DashNavbar from "../../../components/DashNavbar";
import ClubEventCard from "../../../components/ClubEventCard";
import API from "../../../axios";

function ClubProfile() {
  const navigate = useNavigate();
  const { clubName } = useParams();

  const [club, setClub] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    major: "",
    yearLevel: "",
    motivation: "",
    skills: "",
    availability: "",
  });

  const handleBack = () => navigate(-1);

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await API.get(`/api/clubs/name/${clubName}`);
        setClub(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load club data.");
      }
    };
    fetchClub();
  }, [clubName]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in.");
        return;
      }
      await API.post("/api/clubmemberships", {
        ...formData,
        clubId: club._id,
        userId,
        status: "pending",
      });
      setShowForm(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit request.");
    }
  };

  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>{error}</h2>
      </div>
    );
  }

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
        <div className="club-profile-main">
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
            <button
              className="subscribe-btn"
              onClick={() => setShowSubscribeModal(true)}
            >
              Subscribe
            </button>
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
          </div>

          <div className="events-section">
            <h2>Upcoming events</h2>
            <div className="events-carousel">
              {club.events.length > 0 ? (
                club.events.map((event, idx) => (
                  <ClubEventCard
                    key={idx}
                    id={event._id}
                    title={event.title}
                    subtitle={event.subtitle}
                    price={event.price}
                    date={event.date}
                    location={event.location}
                  />
                ))
              ) : (
                <p>No upcoming events at this time.</p>
              )}
            </div>
          </div>

          <div className="apply-section">
            <p>Join us now and be part of an exciting community!</p>
            <button
              className="membership-btn"
              onClick={() => setShowForm(true)}
            >
              Apply for membership
            </button>
          </div>

          {showForm && (
            <div className="application-form-overlay">
              <div className="application-form">
                <button
                  className="close-btn"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
                <h3>
                  You are applying to join {club.name}. Please fill the form:
                </h3>
                <form onSubmit={handleFormSubmit}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="studentId"
                    placeholder="Student ID"
                    value={formData.studentId}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="major"
                    placeholder="Major / Department"
                    value={formData.major}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="yearLevel"
                    placeholder="Current Year / Level"
                    value={formData.yearLevel}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="motivation"
                    placeholder="Why do you want to join?"
                    value={formData.motivation}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="skills"
                    placeholder="Skills / Experience"
                    value={formData.skills}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="availability"
                    placeholder="Availability (days/time)"
                    value={formData.availability}
                    onChange={handleInputChange}
                  />

                  <button type="submit" className="submit-btn">
                    Submit Application
                  </button>
                </form>
              </div>
            </div>
          )}

          {showSubscribeModal && (
            <div className="application-form-overlay">
              <div className="application-form">
                <button
                  className="close-btn"
                  onClick={() => setShowSubscribeModal(false)}
                >
                  ×
                </button>
                <h3>Subscribed Successfully!</h3>
                <p>You are now subscribed to {club.name}'s updates.</p>
                <button
                  className="submit-btn"
                  onClick={() => setShowSubscribeModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showSuccessModal && (
            <div className="application-form-overlay">
              <div className="application-form">
                <button
                  className="close-btn"
                  onClick={() => setShowSuccessModal(false)}
                >
                  ×
                </button>
                <h3>Request Submitted!</h3>
                <p>Your request has been submitted and is pending approval.</p>
                <button
                  className="submit-btn"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="social-section">
            <h2>Follow us on</h2>
            <div className="social-icons">
              {club.socialLinks?.map((link, idx) => (
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
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ClubProfile;
