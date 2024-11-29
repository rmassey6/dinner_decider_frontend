import React from "react";
import { Link } from "react-router-dom";
import "./DinnerDeciderHomepage.css";

const DinnerDeciderHomepage = () => {
  return (
    <div className="dinner-decider-homepage">
      <header className="dinner-decider-header">
        <h1>Dinner Decider</h1>
        <p>Plan, explore, and save your favorite recipes!</p>
      </header>

      <div className="dinner-decider-buttons">
        <Link to="/recipes" className="button teal-button">
          Browse Recipes
        </Link>
        <Link to="/favourites" className="button teal-button">
          Favorite Recipes
        </Link>
        <Link to="/recipes/create" className="button teal-button">
          Start Meal Planning
        </Link>
      </div>
    </div>
  );
};

export default DinnerDeciderHomepage;
