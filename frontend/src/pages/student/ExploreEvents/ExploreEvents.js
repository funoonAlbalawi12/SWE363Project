import React from "react";
import { useState } from "react";
import DashNavbar from "../../../components/DashNavbar";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import { Carousel } from "react-responsive-carousel";
import events from "../../../data/EventData";
import "./ExploreEvents.css";

function ExploreEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(2);
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DashNavbar />
      <div className="explore-events-page">
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
                  key={idx}
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

            <button
              className="view-more-btn"
              onClick={() => setVisibleCount((prev) => prev + 2)}
            >
              View more
            </button>
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
            centerSlidePercentage={45}
          >
            {Array.from({ length: Math.ceil(events.length / 2) }).map(
              (_, groupIndex) => (
                <div className="carousel-slide" key={groupIndex}>
                  {events
                    .slice(groupIndex * 2, groupIndex * 2 + 2)
                    .map((event, idx) => (
                      <EventCard
                        key={idx}
                        title={event.title}
                        price={event.price}
                        date={event.date}
                        location={event.location}
                        img={event.img}
                      />
                    ))}
                </div>
              )
            )}
          </Carousel>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ExploreEvents;
