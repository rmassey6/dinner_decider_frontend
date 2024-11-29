import React, { useState, useCallback } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MainNavigation from "./Navigation/MainNavigation";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import DinnerDeciderHomepage from "./DinnerDeciderHomepage/DinnerDeciderHomepage";
import Recipes from "./recipe/pages/Recipes";
import RecipeCreation from "./recipe/pages/RecipeCreation";
import RecipeView from "./recipe/pages/RecipeView";
import FavRecipes from "./Favourites/pages/FavRecipes";

import { AuthContext } from "./Shared/context/auth-context.js";

function App() {
  //For testing purposes, isLoggedIn is defaults to true. SET IT TO FALSE BEFORE DEPLOYING!
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  //This if statement decides what routes, and therefore what pages, are available to the user
  if (isLoggedIn) {
    routes = (
      <Switch>
        {/* Users who are logged in get a different homepage */}
        <Route path="/" exact>
          <DinnerDeciderHomepage />
        </Route>
        <Route path="/recipes" exact>
          <Recipes />
        </Route>
        <Route path="/recipes/create" exact>
          <RecipeCreation />
        </Route>
        <Route path="/recipes/view/:rid" exact>
          <RecipeView />
        </Route>
        {/* Users can only see favourites when logged in */}
        <Route path="/favourites" exact>
          <FavRecipes />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {/* There is no reason for a user who is already logged in to access the login page */}
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/recipes" exact>
          <Recipes />
        </Route>
        <Route path="/recipes/view" exact>
          <RecipeView />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    //AuthContext.Provider is probably what's actually storing the session information
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
