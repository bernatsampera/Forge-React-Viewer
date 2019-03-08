import { SET_FORGE_ACCESS } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";

// Login - Get Forge Access - Auth
export const getForgeAccess = () => dispatch => {
  axios
    .get("/api/oauth")
    .then(res => {
      // Save to localstorage
      const { access_token } = res.data;
      // Set token to localStorage
      localStorage.setItem("access_token", access_token);
      // Decode token to get user data
      const decoded = jwt_decode(access_token);
      // Set current user
      dispatch(setForgeAccess(decoded));
    })
    .catch(err => console.log(err));
};

// Set logged in user
export const setForgeAccess = decoded => {
  return {
    type: SET_FORGE_ACCESS,
    payload: decoded
  };
};

// Log user out
export const removeAccess = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("access_token");
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setForgeAccess({}));
};