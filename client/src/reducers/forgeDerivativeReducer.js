import { CONVERT_MODEL, POST_LOADING, GET_OBJECT_INFO } from "../actions/types";

const initialState = {
  urn: "",
  objectInfo: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONVERT_MODEL:
      return {
        ...state,
        urn: action.payload,
        loading: false
      };
    case GET_OBJECT_INFO:
      return {
        ...state,
        objectInfo: action.payload,
        loading: false
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
