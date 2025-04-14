import React from "react";
import DashNavbar from "../../../components/DashNavbar";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import { Carousel } from "react-responsive-carousel";
import "./ExploreEvents.css";

function ExploreEvents() {
  return (
    <>
      <DashNavbar />
      <div className="explore-events-page">
        {/* Title */}
        <h1 className="page-title">Explore Event</h1>

        {/* Search Bar */}
        <div className="search-bar-container">
          <input type="text" placeholder="Enter the event name" className="search-input" />
          <button className="search-btn">Search</button>
        </div>

        {/* Content Grid */}
        <div className="events-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <h3>Filter</h3>

            <div className="filter-group">
              <h4>Category</h4>
              <label><input type="checkbox" /> All</label>
              <label><input type="checkbox" /> Trending</label>
              <label><input type="checkbox" /> Upcoming</label>
              <label><input type="checkbox" /> Coding</label>
              <label><input type="checkbox" /> Sport</label>
              <label><input type="checkbox" /> Exhibition</label>
              <label><input type="checkbox" /> Business</label>
              <label><input type="checkbox" /> Photography</label>
            </div>

            <div className="filter-group">
              <h4>Pricing</h4>
              <label><input type="checkbox" /> Free</label>
              <label><input type="checkbox" /> Paid</label>
            </div>

            <div className="filter-group">
              <h4>Type</h4>
              <label><input type="checkbox" /> Online</label>
              <label><input type="checkbox" /> Offline - Indoor</label>
              <label><input type="checkbox" /> Offline - Outdoor</label>
            </div>

            <div className="filter-group">
              <h4>Language</h4>
              <label><input type="checkbox" /> English</label>
              <label><input type="checkbox" /> Arabic</label>
            </div>

            <div className="filter-buttons">
              <button className="clear-btn">Clear all</button>
              <button className="apply-btn">Apply</button>
            </div>
          </div>

          {/* Event Results */}
          <div className="event-results">
            <p className="results-count">6 results</p>

            <div className="event-grid">
            <EventCard
              title="GSR"
              price="10SR / Ticket"
              date="Monday, February 6 | 04:00 PM"
              location="Dhahran, Saudi Arabia"
              img="https://gaming.kfupm.org/wp-content/uploads/2024/11/Home-page.png"
            />
            <EventCard  title="GSR"
              price="10SR / Ticket"
              date="Monday, February 6 | 04:00 PM"
              location="Dhahran, Saudi Arabia"
              img="https://gaming.kfupm.org/wp-content/uploads/2024/11/Home-page.png"/>
            <EventCard  title="GSR"
              price="10SR / Ticket"
              date="Monday, February 6 | 04:00 PM"
              location="Dhahran, Saudi Arabia"
              img="https://gaming.kfupm.org/wp-content/uploads/2024/11/Home-page.png"/>
            <EventCard  title="GSR"
              price="10SR / Ticket"
              date="Monday, February 6 | 04:00 PM"
              location="Dhahran, Saudi Arabia"
              img="https://gaming.kfupm.org/wp-content/uploads/2024/11/Home-page.png"/>
              </div>

            <button className="view-more-btn">View more</button>
          </div>
        </div>

       
        <div className="recommended-section">
          <h2>Recommended for you</h2>
          
            <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop={true}
                      autoPlay={false}
                      interval={4000}
                      showArrows={true}
                      className="recommended-carousel"
                      // centerMode={true}
                      centerSlidePercentage={45}
                    >
            <div className="carousel-cards">
              <EventCard title="GSR"
              price="10SR / Ticket"
              date="Monday, February 6 | 04:00 PM"
              location="Dhahran, Saudi Arabia"
              img="https://gaming.kfupm.org/wp-content/uploads/2024/11/Home-page.png"/>
              <EventCard title="GSR"
              price="10SR / Ticket"
              date="Monday, February 6 | 04:00 PM"
              location="Dhahran, Saudi Arabia"
              img="https://gaming.kfupm.org/wp-content/uploads/2024/11/Home-page.png"/>
            </div>
            <div className="carousel-cards">
              <EventCard title="GSR"
              price="10SR / Ticket" 
              date="Monday, February 6 | 04:00 PM"
              location="Dhahran, Saudi Arabia"
              img="https://gaming.kfupm.org/wp-content/uploads/2024/11/Home-page.png"/>
              </div>
            </Carousel>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ExploreEvents;
