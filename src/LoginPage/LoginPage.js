import React, { useContext, useState } from "react";
import "./LoginPage.css";
import { useHttpClient } from "../Shared/Hooks/http-hook";
import { AuthContext } from "../Shared/context/auth-context";

const LoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (isRegistering) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log(
        "Registering with:",
        formData.username,
        formData.email,
        formData.password
      );
      try {
        const responseData = await sendRequest(
          "http://localhost:8080/api/users/register",
          "POST",
          JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userID);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Logging in with:", formData.email, formData.password);
      try {
        const responseData = await sendRequest(
          "http://localhost:8080/api/users/login",
          "POST",
          JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData[0]._id);
        console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const toggleFormHandler = () => {
    setIsRegistering((prevState) => !prevState);
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="login-page">
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={formSubmitHandler}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={inputChangeHandler}
            required
          />
        </div>
        {isRegistering && (
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={inputChangeHandler}
              required
            />
          </div>
        )}
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={inputChangeHandler}
            required
          />
        </div>
        {isRegistering && (
          <div className="form-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={inputChangeHandler}
              required
            />
          </div>
        )}
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button className="toggle-button" onClick={toggleFormHandler}>
        {isRegistering
          ? "Already have an account? Login"
          : "New user? Register"}
      </button>
    </div>
  );
};

export default LoginPage;
