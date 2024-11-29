import React from "react";
import "./FavRecipeList.css";
import FavRecipeItem from "./FavRecipeItem";

const FavRecipeList = (props) => {
  return (
    <div className="fav-recipe-list">
      {props.recipes.map((recipe) => (
        <FavRecipeItem key={recipe.recipeID} recipe={recipe} />
      ))}
    </div>
  );
};

export default FavRecipeList;