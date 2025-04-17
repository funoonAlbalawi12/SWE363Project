import React from "react";

import EventCard from "../../../components/EventCard";
import UserClubCard from "../../../components/UserClubCard";
import Footer from "../../../components/Footer";
import DashNavbar from "../../../components/DashNavbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Dashboard.css";
import events from "../../../data/EventData";

function Dashboard() {
  return (
    <div className="dashboard">
      <DashNavbar />

      <div className="dashboard-content">
        <h2 className="greeting">Hello!</h2>


        <div className="section-header">
              <h3>Your Events</h3>
             
            </div>
        <div className="events-clubs-section">
          <div className="your-events">
            

            {events.slice(0, 2).map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                subtitle={event.club || "KFUPM Club"} // fallback if no club
                price={event.price}
                date={event.date}
                location={event.location}
                img={event.img}
              />
            ))}
          </div>

          <div className="your-clubs">
            <h3>Your Clubs</h3>
            <UserClubCard name="Computer Club" role="Marketing team member" />
            <UserClubCard name="Visitation Club" role="Vice President" />
      
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
              {Array.from({ length: Math.ceil(events.length / 2) }).map(
            (_, groupIndex) => (
              <div className="carousel-slide" key={groupIndex}>
                {events
                  .slice(groupIndex * 2, groupIndex * 2 + 2)
                  .map((event, i) => (
                    <EventCard
                      key={i}
                      title={event.title}
                      price={event.price}
                      date={event.date}
                      location={event.location}
                      img={event.img}
                    />
                  ))}
                  </div> )
          )}
          </Carousel>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
