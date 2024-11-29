import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import { AuthContext } from "../../Shared/context/auth-context";

import "./RecipeView.css";
import IngredientsTable from "../components/IngredientsTable";
import StepsList from "../components/StepsList";

const recipe = {
  recipeName: "Honey Garlic Chicken and Rice Bowl",
  creatorID: "user1",
  ingredientsList: [
    {
      ingredientName: "Garlic",
      ingredientAmount: "1 clove",
    },
    {
      ingredientName: "Onion",
      ingredientAmount: "1/2",
    },
    {
      ingredientName: "Bell Pepper",
      ingredientAmount: "1/2",
    },
    {
      ingredientName: "Broccoli",
      ingredientAmount: "4 fleurettes",
    },
    {
      ingredientName: "Soy Sauce",
      ingredientAmount: "1 tbsp",
    },
    {
      ingredientName: "Honey",
      ingredientAmount: "1 tbsp",
    },
    {
      ingredientName: "Chicken Breast",
      ingredientAmount: "1",
    },
    {
      ingredientName: "Paprika",
      ingredientAmount: "1 tsp",
    },
    {
      ingredientName: "Chili Powder",
      ingredientAmount: "1 tsp",
    },
    {
      ingredientName: "Rice",
      ingredientAmount: "3/4 cup dry",
    },
    {
      ingredientName: "Mayonnaise",
      ingredientAmount: "2 tbsp",
    },
    {
      ingredientName: "Hot Sauce",
      ingredientAmount: "1/2 tsp",
    },
  ],
  recipeSteps: [
    "Heat oven to 400F",
    "Add rice to pot with 1 1/2 cups of water",
    "Bring rice to a boil and set heat to low",
    "Let rice simmer for 15 minutes or until bubbles stop appearing then remove from heat",
    "Chop broccoli into pieces ~1/2 inch each",
    "Slice onion and bell pepper into strips ~1/4 inch wide",
    "Mince garlic",
    "Mix paprika and chili powder in a bowl",
    "Rub chicken breast with paprika and chili powder mix, coating evenly",
    "Bake chicken breast for 15 minutes or until a thermometer inserted into the thickest part reads 165F",
    "Heat oil in a pan on medium-low heat",
    "Add garlic to pan, stir until fragrant and slightly browned",
    "Add onion, bell pepper, and broccoli to pan",
    "Add soy sauce to pan",
    "Stir-fry until vegetables are soft",
    "Add honey to pan and stir slowly for 1 minute",
    "Remove pan from heat",
    "Mix mayonnaise and hot sauce in a bowl along with small amounts of water until mixture is slightly runny",
    "Shred chicken by pulling apart with two forks",
    "Spoon rice into a bowl",
    "Add chicken on top of rice",
    "Add vegetables on top of chicken",
    "Drizzle spicy mayonnaise on top of vegetables",
    "Makes three servings",
  ],
  difficulty: 3,
  prepTime: {
    hours: 0,
    minutes: 45,
  },
  dishType: "Main",
  dishRegion: "Asian",
};
const RecipeView = (props) => {
  const [loadedRecipe, setLoadedRecipe] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const recipeId = useParams().rid;

  const addToFavourites = () => {
    console.log(loadedRecipe._id);
    // add recipe to favourites for user
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/api/recipes/${recipeId}`
        );
        setLoadedRecipe(responseData[0]);
      } catch (err) {}
    };
    fetchRecipe();
  }, [sendRequest, recipeId]);

  if (loadedRecipe) {
    return (
      <div className="recipe-view">
        <div className="recipe-page">
          <div className="recipe-image">
            <img
              src={`${loadedRecipe.recipeImage.src}`}
              alt={`${loadedRecipe.recipeImage.alt}`}
              width="800px"
            />
          </div>
          <div className="recipe-details">
            <div className="recipe-name">
              <h1>{loadedRecipe.recipeName}</h1>
            </div>
            <div className="recipe-difficulty">
              <p className="difficulty">
                Difficulty: {loadedRecipe.difficulty}/5
              </p>
              <p className="completion">{`Estimated Completion: ${loadedRecipe.prepTime.hours}h${loadedRecipe.prepTime.minutes}m`}</p>
            </div>
            <IngredientsTable ingredients={loadedRecipe.ingredientsList} />
          </div>
          <div className="break"></div>
          <StepsList steps={loadedRecipe.recipeSteps} />
          {auth.isLoggedIn ? (
            <button onClick={addToFavourites}>Add to favourites</button>
          ) : (
            <button>login</button>
          )}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default RecipeView;
