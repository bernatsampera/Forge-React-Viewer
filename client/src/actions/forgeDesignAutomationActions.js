import {
  GET_ACTIVITIES,
  GET_MODEL_INFO,
  ACTIVITY_FINISHED,
  ACTIVITY_STARTED
} from "./types";
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
  var time = null;

  const finish = false;
  axios
    .post("/api/designautomation/workitems", body, {
      params: { access_token: localStorage.access_token }
    })
    .then(res => {
      dispatch({
        type: ACTIVITY_STARTED
      });
      const id = res.data.id;
      time = setInterval(() => workItemSuccess(id, bucketKey, filename), 5000);
    })
    .catch(err => console.log(err));

  function workItemSuccess(id, bucketKey, filename) {
    axios
      .get("/api/designautomation/workitem", {
        params: { access_token: localStorage.access_token, id }
      })
      .then(res => {
        if (res.data.status == "success") {
          clearInterval(time);
          dispatch({
            type: ACTIVITY_FINISHED
          });
        }
      })
      .catch();
  }
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
