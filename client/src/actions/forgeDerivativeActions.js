import axios from "axios";
import { CONVERT_MODEL, POST_LOADING, GET_OBJECT_INFO } from "./types";

// Convert a model
export const convertModel = (objectId, filename) => dispatch => {
  dispatch(setPostLoading());
  const urn = `${objectId}/${filename}`;
  const body = {
    access_token: localStorage.access_token,
    urn
  };
  axios
    .post("/api/modelderivative/convert", body)
    .then(res => {
      dispatch({ type: CONVERT_MODEL, payload: res.data.data.urn });
    })
    .catch(err => console.log(err));
};

// Get Tree info, Returns an array of 9 objects, in 2d and 3d
export const getTreeInfo = (objectId, filename) => dispatch => {
  dispatch(setPostLoading());
  const urn = `${objectId}/${filename}`;
  axios
    .get("/api/modelderivative/treeInfo", {
      params: { access_token: localStorage.access_token, urn }
    })
    .then(res => {
      const object3d = res.data.data[0]; // Gets the first object from metadata array, the one which is in 3D
      dispatch(getObjectInfo(urn, object3d.guid));
    })
    .catch(err => console.log(err));
};

// Get Object info, corresponding to the first object retrieved by getTreeinfo
export const getObjectInfo = (urn, guid) => dispatch => {
  axios
    .get("/api/modelderivative/objectInfo", {
      params: { access_token: localStorage.access_token, urn, guid: guid }
    })
    .then(res => {

      dispatch({ type: GET_OBJECT_INFO, payload: res.data.data[0].objects });
    })
    .catch(err => console.log(err));
};

// Set loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
