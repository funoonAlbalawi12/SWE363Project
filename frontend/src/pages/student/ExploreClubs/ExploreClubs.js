import React from "react";
import ClubCard from "../../../components/ClubCard";
import Footer from "../../../components/Footer"; 
import "./ExploreClubs.css";
import DashNavbar from "../../../components/DashNavbar";

function ExploreClubs() {
  const clubs = [
    {
      id: "ieom",
      name: "IEOM KFUPM CHAPTER",
      description: "Professional chapter focused on industrial engineering.",
    img:"https://pbs.twimg.com/profile_images/1701546490278154240/6SuJ7TE2_400x400.jpg"
    },
    {
      id: "coding",
      name: "Computer Club",
      description: "For developers, programmers, and software enthusiasts.",
    },
    {
      id: "photo",
      name: "Photography Club",
      description: "Capturing memories one frame at a time.",
    },
  ];

  return (
    <>
    <DashNavbar />
    <div className="explore-clubs-page">
      <header className="clubs-header">
        <h1>Discover a variety of student clubs that match your interests!</h1>
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
        {clubs.map((club, index) => (
          <ClubCard
            key={club.id}
            id={club.id}
            name={club.name}
            description={club.description}
            img={club.img}
          />
        ))}
      </div>

      <Footer />
    </div>
    </>
  );
}

export default ExploreClubs;
