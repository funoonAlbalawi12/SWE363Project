import React, { useEffect, useState } from "react";
import ClubCard from "../../../components/ClubCard";
import Footer from "../../../components/Footer";
import "./ExploreClubs.css";
import DashNavbar from "../../../components/DashNavbar";
import API from "../../../axios"; 

function ExploreClubs() {
  const [clubs, setClubs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await API.get("/api/clubs");
        setClubs(response.data); 
      } catch (error) {
        console.error(error);
        setError("Failed to load clubs.");
      } 
    };

    fetchClubs();
  }, []);

  if (error) return <p>{error}</p>;

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
          {clubs.map((club) => (
            <ClubCard
              key={club._id}
              id={club._id}
              name={club.name}
              description={club.description}
              img={club.image} 
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
