import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../Shared/Hooks/http-hook";

import FavRecipeList from "../components/FavRecipeList";
import "./FavRecipes.css";

const FavRecipes = () => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8080/api/users/me/favorites",
          "GET",
          null,
          { Authorization: `Bearer ${localStorage.getItem("token")}` }
        );
        setFavoriteRecipes(responseData.favourites);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFavorites();
  }, [sendRequest]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="fav-recipes-page">
      <h1 className="fav-recipes-title">My Favorite Recipes</h1>
      <FavRecipeList recipes={favoriteRecipes} />
    </div>
  );
};

export default FavRecipes;
