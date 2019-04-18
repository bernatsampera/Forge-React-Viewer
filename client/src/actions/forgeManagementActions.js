import { GET_BUCKETS, GET_MODELS, MANAGEMENT_LOADING } from "./types";
import axios from "axios";

// Get Buckets
export const getBuckets = () => dispatch => {
  dispatch(setPostLoading());
  const body = {
    access_token: localStorage.getItem("access_token")
  };
  axios
    .post("/api/datamanagement/buckets", body)
    .then(res => {
      if (res.data) {
        dispatch({
          type: GET_BUCKETS,
          payload: res.data.data.items
        });
      }
    })
    .catch(err => console.log(err));
};

// Create Bucket
export const createBucket = (bucketKey, policyKey, history) => dispatch => {
  const body = {
    access_token: localStorage.getItem("access_token"),
    bucketKey,
    policyKey
  };

  axios
    .post("/api/datamanagement/create", body)
    .then(res => {
      dispatch(getBuckets());
      history.push("/");
    })
    .catch(err => console.log(err));
};

// Get Models
export const getModels = bucketKey => dispatch => {
  dispatch(setPostLoading());
  const body = {
    access_token: localStorage.getItem("access_token"),
    bucketKey
  };
  axios
    .post("/api/datamanagement/models", body)
    .then(res =>
      dispatch({
        type: GET_MODELS,
        payload: res.data.data.items
      })
    )
    .catch(err => console.log(err));
};

// Upload Model
export const uploadModel = (file, bucketKey) => dispatch => {
  const data = new FormData();
  data.append("fileToUpload", file, file.name);
  data.append("access_token", localStorage.getItem("access_token"));
  data.append("bucketKey", bucketKey);

  axios
    .post("/api/datamanagement/upload", data)
    .then(res => dispatch(getModels(bucketKey)))
    .catch(err => console.log(err));
};

// Delete a Model
export const deleteModel = (bucketKey, filename) => dispatch => {
  dispatch(setPostLoading());
  const body = {
    access_token: localStorage.getItem("access_token"),
    bucketKey: bucketKey,
    filename: filename
  };
  axios
    .post("/api/datamanagement/model/delete", body)
    .then(res => dispatch(getModels(bucketKey)))
    .catch(err => console.log(err));
};

// Set loading
export const setPostLoading = () => {
  return {
    type: MANAGEMENT_LOADING
  };
};
