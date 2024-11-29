import React from "react";

import "./RecipeList.css";
import RecipeItem from "./RecipeItem";

const RecipeList = (props) => {
    return (
        <div className="recipe-list">
            {props.recipes.map((recipe) => {
                return <RecipeItem recipe={recipe} key={recipe._id} />;
            })}
        </div>
    );
};

export default RecipeList;
