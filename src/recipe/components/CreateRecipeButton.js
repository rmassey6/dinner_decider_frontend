import React from "react";

import "./CreateRecipeButton.css";

const CreateRecipeButton = ({onSubmit}) => {
    return (
        <button className="create-recipe-btn" type="submit" onClick={onSubmit}>
           Create Recipe
        </button>
    );
};

export default CreateRecipeButton;
