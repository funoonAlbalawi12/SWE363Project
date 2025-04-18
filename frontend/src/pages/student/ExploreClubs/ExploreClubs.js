import React from "react";
import ClubCard from "../../../components/ClubCard";
import Footer from "../../../components/Footer";
import "./ExploreClubs.css";
import DashNavbar from "../../../components/DashNavbar";
import clubs from "../../../data/ClubData";

function ExploreClubs() {
  const clubEntries = Object.entries(clubs);

  return (
    <>
      <DashNavbar />
      <div className="explore-clubs-page">
        <header className="clubs-header">
          <h1>
            Discover a variety of student clubs that match your interests!
          </h1>
          <p>
            Join a community, participate in events, and make the most of your
            university experience.
          </p>
        </header>

        <div className="search-bar">
          <input type="text" placeholder="Enter the club name" />
          <button className="filter-btn">Filter</button>
          <button className="search-btn">Search</button>
        </div>

        <div className="clubs-grid">
          {clubEntries.map(([id, club]) => (
            <ClubCard
              key={id}
              id={id}
              name={club.name}
              description={club.description}
              img={club.img}
              className="custom-club-card"
            />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default ExploreClubs;
