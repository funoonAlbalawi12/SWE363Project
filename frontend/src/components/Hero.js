import React from "react";


function Hero() {
    return (
      <section className="hero">
        <h1>Pick up your next activity</h1>
        <div className="search-bar">
          <input placeholder="Find the event you're interested in" />
          <button className="btn">Search</button>
        </div>
      </section>
    );
  }

  export default Hero;