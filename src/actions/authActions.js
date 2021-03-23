import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
} from "./types";

import { returnErrors, clearErrors } from "./errorActions";
import setHeaders from "../config/setHeaders";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // Dispatch user loading
  dispatch({ type: USER_LOADING });

  // Get user
  axios
    .get("https://devgroceryapi.spericorn.com/api/user", setHeaders(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Register user
export const registerUser = (
  { firstName, lastName, age, email, username, password, cPassword },
  history
) => (dispatch) => {
  // Set headers value
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Parsing body
  const body = JSON.stringify({
    firstName,
    lastName,
    age,
    email,
    username,
    password,
    cPassword,
  });

  // Register
  axios
    .post("https://devgroceryapi.spericorn.com/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      // Clear errors
      dispatch(clearErrors());

      history.push("/login");
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

// Login user
export const loginUser = ({ username, password }, history) => (dispatch) => {
  // Set headers value
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Parsing body
  const body = JSON.stringify({ username, password });

  // Login
  axios
    .post("https://devgroceryapi.spericorn.com/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // Clear erros
      dispatch(clearErrors());

      history.push("/dashboard");
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

// Logout user
export const logoutUser = (history) => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  history.push("/login");
};
