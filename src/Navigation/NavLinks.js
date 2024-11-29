import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../Shared/context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className={`nav-links ${props.className || ""}`}>
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      {/* This link is no longer needed since that route is now the logged in homepage */}
      {/* <li>
        <NavLink to="/dinner-decider" exact>
          Dashboard
        </NavLink>
      </li> */}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/favourites" exact>
            Favourites
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/recipes">Recipes</NavLink>
      </li>
      {/* When logged in, the login page link is switched with a logout button that returns
      the user to the homepage */}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login" exact>
            Sign Up / Log In
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/" onClick={auth.logout}>
            Log Out
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
