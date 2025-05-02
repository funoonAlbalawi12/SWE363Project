import React, { useEffect } from "react";
import { useState } from "react";
import DashNavbar from "../../../components/DashNavbar";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import { Carousel } from "react-responsive-carousel";
import API from "../../../axios";
import "./ExploreEvents.css";

function ExploreEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(2);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get("/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load events.");
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <p>{error}</p>;

  return (
    <>
      <DashNavbar />
      <div className="explore-events-page">
        <div className="main-explore-events">
          <h1 className="page-title">Explore Event</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter the event name"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="search-btn">Search</button>
          </div>

          <div className="events-content">
            <div className="filters-sidebar">
              <h3>Filter</h3>

              <div className="filter-group">
                <h4>Category</h4>
                <label>
                  <input type="checkbox" /> All
                </label>
                <label>
                  <input type="checkbox" /> Trending
                </label>
                <label>
                  <input type="checkbox" /> Upcoming
                </label>
                <label>
                  <input type="checkbox" /> Coding
                </label>
                <label>
                  <input type="checkbox" /> Sport
                </label>
                <label>
                  <input type="checkbox" /> Exhibition
                </label>
                <label>
                  <input type="checkbox" /> Business
                </label>
                <label>
                  <input type="checkbox" /> Photography
                </label>
              </div>

              <div className="filter-group">
                <h4>Pricing</h4>
                <label>
                  <input type="checkbox" /> Free
                </label>
                <label>
                  <input type="checkbox" /> Paid
                </label>
              </div>

              <div className="filter-group">
                <h4>Type</h4>
                <label>
                  <input type="checkbox" /> Online
                </label>
                <label>
                  <input type="checkbox" /> Offline - Indoor
                </label>
                <label>
                  <input type="checkbox" /> Offline - Outdoor
                </label>
              </div>

              <div className="filter-group">
                <h4>Language</h4>
                <label>
                  <input type="checkbox" /> English
                </label>
                <label>
                  <input type="checkbox" /> Arabic
                </label>
              </div>

              <div className="filter-buttons">
                <button className="clear-btn">Clear all</button>
                <button className="apply-btn">Apply</button>
              </div>
            </div>

            <div className="event-results">
              <div className="event-grid">
                {filteredEvents.slice(0, visibleCount).map((event, idx) => (
                  <EventCard
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    price={event.price}
                    date={event.date}
                    location={event.location}
                    img={event.img}
                  />
                ))}
              </div>
              {filteredEvents.length === 0 && (
                <p className="no-results">No events match your search.</p>
              )}
              {filteredEvents.length > visibleCount && (
                <button
                  className="view-more-btn"
                  onClick={() => setVisibleCount((prev) => prev + 2)}
                >
                  View more
                </button>
              )}
            </div>
          </div>

          <div className="recommended-section">
            <h2>Recommended for you</h2>

            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay={false}
              interval={4000}
              showArrows={true}
              className="recommended-carousel"
            >
              {events.length > 0 &&
                events.map((event) => (
                  <div className="carousel-slide" key={event._id}>
                    <EventCard
                      key={event._id}
                      id={event._id}
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
    </>
  );
}

export default ExploreEvents;
