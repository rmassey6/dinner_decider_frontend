import React from "react";
import { Link } from "react-router-dom";
import "./FavRecipeItem.css";

const FavRecipeItem = (props) => {
  return (
    <div className="fav-recipe-item">
      <img
        src={props.recipe.recipeImage.src}
        alt={props.recipe.recipeImage.alt}
        height="200px"
      />
      <div className="recipe-name">
        <h1>{props.recipe.recipeName}</h1>
      </div>
      <h3>Difficulty: {props.recipe.difficulty}/5</h3>
      <h3>Estimated Completion Time: {props.recipe.prepTime}</h3>
      <Link to={`/recipes/view/${props.recipe.recipeID}`}>
        <button className="recipe-button">View Recipe</button>
      </Link>
    </div>
  );
};

export default FavRecipeItem;