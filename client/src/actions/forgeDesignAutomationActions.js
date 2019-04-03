import { GET_ACTIVITIES, GET_WORKITEMS } from "./types";
import axios from "axios";

export const getActivities = () => dispatch => {
  axios
    .get("/api/designautomation/activities", {
      params: { access_token: localStorage.access_token }
    })
    .then(res =>
      dispatch({
        type: GET_ACTIVITIES,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const getWorkItems = () => dispatch => {
  axios
    .get("/api/designautomation/workitems", {
      params: { access_token: localStorage.access_token }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
