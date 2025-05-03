import React, { useEffect, useState } from "react";
import DashNavbar from "../../../components/DashNavbar";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import API from "../../../axios";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/api/events");
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch events", err);
        setError("Could not load events.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const today = new Date();
  const next24h = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const parseEventDateTime = (dateStr) => {
    const [datePart, timePart] = dateStr.split("|").map((str) => str.trim());
    const fullDateStr = `${datePart}, ${new Date().getFullYear()} ${timePart}`;
    return new Date(fullDateStr);
  };

  const next24hEvents = events.filter((event) => {
    const eventDate = parseEventDateTime(event.date);
    return eventDate >= today && eventDate <= next24h;
  });

  return (
    <div>
      <DashNavbar />
      <Hero />
      <div className="content">
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="content-header">
              <h2>New Events in KFUPM</h2>
            </div>

            <div className="event-container">
              {events.slice(0, 3).map((event, index) => (
                <EventCard
                  key={index}
                  title={event.title}
                  price={event.price}
                  date={event.date}
                  location={event.location}
                  img={event.img}
                />
              ))}
            </div>

            <h2>Upcoming in 24 Hours</h2>
            <div className="upcoming-container">
              {next24hEvents.length > 0 ? (
                next24hEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    title={event.title}
                    price={event.price}
                    date={event.date}
                    location={event.location}
                    img={event.img}
                  />
                ))
              ) : (
                <p>No events in the next 24 hours.</p>
              )}
            </div>

            <h2>Highlights This Week</h2>
            <Carousel
              showThumbs={false}
              showStatus={false}
              showIndicators={true}
              infiniteLoop={true}
              autoPlay={false}
              showArrows={false}
              className="highlight-carousel"
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
                  </div>
                )
              )}
            </Carousel>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
