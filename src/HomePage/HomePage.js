import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-page-header">
        <h1>Welcome to Dinner Decider</h1>
        <p>Your ultimate meal-planning assistant.</p>
      </header>
      <section className="home-page-actions">
        {/* Link Explore Recipes Button to /recipes */}
        <Link to="/recipes" className="explore-button">
          Explore Recipes
        </Link>
      </section>
      <section className="home-page-about">
        <h2>Why Choose Dinner Decider?</h2>
        <p>
          Simplify your meal planning with personalized recipes to make cooking fun and effortless.
        </p>
      </section>
    </div>
  );
};

export default HomePage;


