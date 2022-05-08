import { SET_FORGE_ACCESS, SET_VIEWER_ACCESS } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";

// Login - Get Forge Access - Auth
export const getForgeAccess = (client_id, client_secret, history) => dispatch => {

  const body = {
    client_id,
    client_secret
  };

  axios
    .post("/api/oauth", body)
    .then(res => {
      // Save to localstorage
      const { access_token } = res.data;
      // console.log(res.data)
      // Set token to localStorage
      localStorage.setItem("access_token", access_token);
      // Decode token to get user data
      const decoded = jwt_decode(access_token);
      // Set current user
      dispatch(setForgeAccess(decoded));
      // Go to /dashboard
      history.push("/");
    })
    .catch(err => console.log(err));
};

// Get Viewer Access
export const getViewerAccess = () => dispatch => {


  axios
    .get("/api/oauth/public")
    .then(res => {
      // console.log(res.data)
      dispatch(setViewerAccess(res.data))
    })
    .catch(err => {
      // console.log(err)
    });
};

// Set logged in user
export const setForgeAccess = decoded => {
  return {
    type: SET_FORGE_ACCESS,
    payload: decoded
  };
};

// Set viewer token
export const setViewerAccess = decoded => {
  return {
    type: SET_VIEWER_ACCESS,
    payload: decoded
  };
};

// Log user out
export const removeAccess = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("access_token");
  localStorage.removeItem("documentId");
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setForgeAccess({}));
  dispatch(setViewerAccess({}));
  // Go to /
  if (history) {
    history.push("/");
  }
};
