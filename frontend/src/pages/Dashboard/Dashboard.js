import React from "react";

import EventCard from "../../components/EventCard";
import ClubCard from "../../components/ClubCard";
import Footer from "../../components/Footer";
import DashNavbar from "../../components/DashNavbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <DashNavbar />

      <div className="dashboard-content">
        <h2 className="greeting">Hello!</h2>

        <div className="events-clubs-section">
          <div className="your-events">
            <div className="section-header">
              <h3>Your Events</h3>
              <button className="view-all-btn">View all</button>
            </div>
            <EventCard
              title="Meet ICS Dean"
              subtitle="Computer Club"
              price="Free Ticket"
              date="Saturday, February 20 | 08:00 PM"
              location="Building 4, room 124"
            />
            <EventCard
              title="Chemical Engineering: Introduction"
              subtitle="Chemical Engineering Club"
              date="Wednesday, June 7 | 07:00 PM"
              location="Building 4, room 124"
            />
          </div>

          <div className="your-clubs">
            <h3>Your Clubs</h3>
            <ClubCard name="Computer Club" role="Marketing team member" />
            <ClubCard name="Visitation Club" role="Vice President" />
            <button className="view-more-clubs">View more</button>
          </div>
        </div>

        <div className="similar-events">
          <h3>Similar Events</h3>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={false}
            interval={4000}
            showArrows={true}
            className="similar-carousel"
          >
            <div className="carousel-slide">
              <EventCard
                title="AI & Innovation Meetup"
                subtitle="Innovation Club"
                date="Monday, April 8 | 06:30 PM"
                location="Building 5, room 210"
              />
            </div>
            <div className="carousel-slide">
              <EventCard
                title="Tech Talk: Cybersecurity"
                subtitle="Computer Club"
                date="Thursday, April 11 | 07:00 PM"
                location="Building 24, Auditorium "
              />
            </div>
            <div className="carousel-slide">
              <EventCard
                title="Design Bootcamp"
                subtitle="Design Club"
                date="Sunday, April 14 | 03:00 PM"
                location="Building 22, room 124"
              />
            </div>
          </Carousel>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
