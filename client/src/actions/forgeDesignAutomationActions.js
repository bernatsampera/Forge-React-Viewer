import { GET_ACTIVITIES, GET_MODEL_INFO } from "./types";
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

//use in model derivative for extraction info of txt
export const getModelInfo = (bucketKey, objectKey) => dispatch => {
  axios
    .get("/api/datamanagement/modelinfo", {
      params: { access_token: localStorage.access_token, bucketKey, objectKey }
    })
    .then(res => {
      dispatch({
        type: GET_MODEL_INFO,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
