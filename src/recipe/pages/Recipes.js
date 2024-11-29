import React, { useContext, useState, useEffect } from "react";

import "./Recipes.css";
import RecipeList from "../components/RecipeList";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { AuthContext } from "../../Shared/context/auth-context";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

const Recipes = (props) => {
  const auth = useContext(AuthContext);

  const [loadedRecipes, setLoadedRecipes] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/api/recipes/`
        );
        setLoadedRecipes(responseData);
      } catch (err) {}
    };
    fetchRecipes();
  }, [sendRequest]);

  const recipes = [
    {
      recipeName: "My Recipe",
      recipeImage: {
        src: "https://cdn.loveandlemons.com/wp-content/uploads/2021/04/green-salad.jpg",
        alt: "A Salad",
      },
      difficulty: 3,
      prepTime: "1h40m",
      recipeID: "recipe1",
    },
    {
      recipeName: "My Recipe",
      recipeImage: {
        src: "https://www.ontariopork.on.ca/Portals/11/EasyDNNnews/1148/Easy-Smash-Burger-with-Best-Burger-Sauce.jpg",
        alt: "A Salad",
      },
      difficulty: 3,
      prepTime: "1h40m",
      recipeID: "recipe2",
    },
    {
      recipeName: "My Recipe",
      recipeImage: {
        src: "https://carmyy.com/wp-content/uploads/2023/01/Avocado-Burgers.jpg",
        alt: "A Salad",
      },
      difficulty: 3,
      prepTime: "1h40m",
      recipeID: "recipe3",
    },
    {
      recipeName: "My Recipe",
      recipeImage: {
        src: "https://www.cookingclassy.com/wp-content/uploads/2022/07/grilled-steak-15.jpg",
        alt: "A Salad",
      },
      difficulty: 3,
      prepTime: "1h40m",
      recipeID: "recipe4",
    },
    {
      recipeName: "My Recipe",
      recipeImage: {
        src: "https://media.istockphoto.com/id/1266150909/photo/background-and-texture-of-instant-noodles.jpg?s=612x612&w=0&k=20&c=L8um5fNLo49z3xuJD1kZ7Gj5UBSo2dpCg7fg3hu7lP4=",
        alt: "A Salad",
      },
      difficulty: 3,
      prepTime: "1h40m",
      recipeID: "recipe5",
    },
  ];

  return (
    <div className="recipes-page">
      {loadedRecipes ? (
        <RecipeList recipes={loadedRecipes} />
      ) : (
        <div>No Recipes</div>
      )}

      {/* Recipe creation is only available when logged in */}
      {auth.isLoggedIn && (
        <div className="create-recipe">
          <Link to="/recipes/create">
            <button className="create-recipe-button">Create a Recipe</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Recipes;
