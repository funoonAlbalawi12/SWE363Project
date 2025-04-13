import React from "react";
import DashNavbar from "../../../components/DashNavbar";
import CategoryCard from "../../../components/CategoryCard";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaCode,
  FaRunning,
  FaCamera,
  FaBriefcase,
  FaUniversity,
} from "react-icons/fa";

function Home() {
  return (
    <body>
      <DashNavbar />
      <Hero />
      <div className="content">
        <div className="content-header">
          <h2>New Events in KFUPM</h2>
          <button className="btn-view-more">View More</button>
        </div>
        <div className="event-container">
          <EventCard
            title="Gaming +"
            price="50 SR/Ticket"
            date="Monday, March 6 | 06:00 AM"
            location="Dhahran, Saudi Arabia"
            img="https://gaming.kfupm.org/wp-content/uploads/2024/11/Home-page.png"
          />
          <EventCard
            title="Marathon"
            price="Free Ticket"
            date="Wednesday, February 24 | 07:00 PM"
            location="Dhahran, Saudi Arabia"
          />
          <EventCard
            title="GSR"
            price="10 SR/Ticket"
            date="Monday, February 6 | 04:00 PM"
            location="Dhahran, Saudi Arabia"
          />
        </div>
        <h2>Explore by Categories</h2>
        <div className="category-container">
          <CategoryCard name="Coding" Icon={FaCode} />
          <CategoryCard name="Sport" Icon={FaRunning} />
          <CategoryCard name="Exhibition" Icon={FaUniversity} />
          <CategoryCard name="Business" Icon={FaBriefcase} />
          <CategoryCard name="Photography" Icon={FaCamera} />
        </div>

        <h2>Upcoming in 24 Hours</h2>
        <div className="upcoming-container">
          <EventCard
            title="GSR"
            date="Monday, February 6 | 04:00 PM"
            location="Dhahran, Saudi Arabia"
            price="10 SR/Ticket"
          />
        </div>

        <h2>Highlights This Week</h2>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={false}
          interval={4000}
          showArrows={true}
          className="highlight-carousel"
          // centerMode={true}
          centerSlidePercentage={45}
        >
          <div className="carousel-slide">
            <EventCard
              title="Gaming +"
              price="Free Ticket"
              date="Wednesday, February 24 | 07:00 PM"
              location="Dhahran, Saudi Arabia"
            />
            <EventCard
              title="Photography Workshop"
              price="50 SR"
              date="Wednesday, March 7 | 06:00 PM"
              location="Dhahran, Saudi Arabia"
            />
          </div>
          <div className="carousel-slide">
            <EventCard
              title="Business Talk"
              price="Free Ticket"
              date="Friday, March 9 | 05:00 PM"
              location="Dhahran, Saudi Arabia"
            />
          </div>
        </Carousel>
      </div>
      <Footer />
    </body>
  );
}

export default Home;
