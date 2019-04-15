import { GET_ACTIVITIES, GET_WORKITEMS, GET_MODEL_INFO } from "./types";
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

export const runWorkItem = (activity, bucketKey, filename) => dispatch => {
  const body = {
    activity,
    bucketKey,
    filename
  };

  axios
    .post("/api/designautomation/workitems", body, {
      params: { access_token: localStorage.access_token }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const getModelInfo = (bucketKey, objectKey) => dispatch => {
  const body = {
    bucketKey,
    objectKey
  };

  axios
    .post("/api/designautomation/modelinfo", body, {
      params: { access_token: localStorage.access_token }
    })
    .then(res =>
      dispatch({
        type: GET_MODEL_INFO,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
