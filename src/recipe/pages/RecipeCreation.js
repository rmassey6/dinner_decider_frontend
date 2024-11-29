import React, { useContext, useState } from "react";

import "./RecipeCreation.css";
import CreateRecipeButton from "../components/CreateRecipeButton";
import { AuthContext } from "../../Shared/context/auth-context";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

const RecipeCreation = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [values, setValues] = useState({
    name: "",
    hourEstimate: 0,
    minuteEstimate: 0,
    steps: "",
    imageUrl: "",
  });

  const [{ ingredientName, ingredientAmount }, setEnteredIngredient] = useState(
    { ingredientName: "", ingredientAmount: "" }
  );
  const [ingredError, setIngredError] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [rating, setRating] = useState();

  const onIngredientChange = () => {
    setEnteredIngredient({
      ingredientName: document.getElementById("ingredient-name").value,
      ingredientAmount: document.getElementById("ingredient-amount").value,
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const addIngredient = () => {
    if (ingredientAmount === "" || ingredientName === "") {
      setIngredError(true);
    } else {
      setIngredients([
        ...ingredients,
        { ingredientName: ingredientName, ingredientAmount: ingredientAmount },
      ]);
      setEnteredIngredient({ ingredientName: "", ingredientAmount: "" });
      setIngredError(false);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const onSubmit = async () => {
    const newRecipe = {
      recipeName: values.name,
      recipeImage: { src: values.imageUrl, alt: `Photo of ${values.name}` },
      creatorID: auth.userId, //This submits the user id for the recipe creator
      ingredientsList: ingredients,
      recipeSteps: values.steps.split(";"),
      difficulty: rating,
      prepTime: {
        hours: values.hourEstimate,
        minutes: values.minuteEstimate,
      },
    };
    console.log("Submitting...", newRecipe);

    try {
      const responseData = await sendRequest(
        "http://localhost:8080/api/recipes",
        "POST",
        JSON.stringify(newRecipe),
        { "Content-Type": "application/json" }
      );
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="form-background">
        <div className="form-item">
          <span>Recipe Name:</span>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={handleChange("name")}
          ></input>
        </div>
        <div className="form-item">
          <span>Image URL:</span>
          <input
            id="imageUrl"
            type="text"
            value={values.imageUrl}
            onChange={handleChange("imageUrl")}
          ></input>
        </div>
        <div className="form-item">
          <span>Difficulty:</span>
          <div>
            <input
              type="radio"
              id="one"
              name="difficulty"
              value={1}
              checked={rating === 1}
              onChange={() => handleRatingChange(1)}
            ></input>
            <label htmlFor="one">1/5</label>
            <input
              type="radio"
              id="two"
              name="difficulty"
              value={2}
              checked={rating === 2}
              onChange={() => handleRatingChange(2)}
            ></input>
            <label htmlFor="two">2/5</label>
            <input
              type="radio"
              id="three"
              name="difficulty"
              value={3}
              checked={rating === 3}
              onChange={() => handleRatingChange(3)}
            ></input>
            <label htmlFor="three">3/5</label>
            <input
              type="radio"
              id="four"
              name="difficulty"
              value={4}
              checked={rating === 4}
              onChange={() => handleRatingChange(4)}
            ></input>
            <label htmlFor="four">4/5</label>
            <input
              type="radio"
              id="five"
              name="difficulty"
              value={5}
              checked={rating === 5}
              onChange={() => handleRatingChange(5)}
            ></input>
            <label htmlFor="five">5/5</label>
          </div>
        </div>
        <div className="form-item">
          <span>Estimated Time:</span>
          <span>
            <label htmlFor="hourEstimate">Hours: </label>
            <input
              type="number"
              id="hourEstimate"
              value={values.hourEstimate}
              onChange={handleChange("hourEstimate")}
            ></input>
          </span>
          <span></span>
          <span>
            <label htmlFor="minuteEstimate">Minutes: </label>
            <input
              type="number"
              id="minuteEstimate"
              value={values.minuteEstimate}
              onChange={handleChange("minuteEstimate")}
            ></input>
          </span>
        </div>
        <div className="form-item">
          <span>Ingredients:</span>
          <span>
            <label htmlFor="ingredient-name">Name: </label>
            <input
              className={ingredError ? "error" : ""}
              id="ingredient-name"
              type="text"
              onChange={onIngredientChange}
              value={ingredientName}
            ></input>
          </span>
          <span></span>
          <span>
            <label htmlFor="ingredient-amount">Amount: </label>
            <input
              className={ingredError ? "error" : ""}
              id="ingredient-amount"
              type="text"
              onChange={onIngredientChange}
              value={ingredientAmount}
            ></input>
          </span>
        </div>
        {ingredError ? (
          <div className="form-item">
            <div></div>
            <span className="err-text">Please enter an ingredient first.</span>
          </div>
        ) : (
          ""
        )}
        {ingredients.map((ingredient, indx) => {
          return (
            <div key={indx} className="form-item">
              <div></div>
              <span className="ingredient">
                {ingredient.ingredientAmount} of {ingredient.ingredientName}
              </span>
            </div>
          );
        })}
        <div className="form-item">
          <div></div>
          <button className="add-ingredient-btn" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <div className="form-item">
          <span>Steps:</span>
          <textarea
            id="steps"
            value={values.steps}
            onChange={handleChange("steps")}
          />
        </div>
      </div>
      <CreateRecipeButton onSubmit={onSubmit} />
    </div>
  );
};

export default RecipeCreation;
