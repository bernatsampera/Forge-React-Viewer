import {
  GET_BUCKETS,
  MANAGEMENT_LOADING,
  GET_MODELS,
  // eslint-disable-next-line no-unused-vars
  GET_MODEL_INFO
} from "../actions/types";

const initialState = {
  buckets: [],
  models: "",
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case MANAGEMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BUCKETS:
      return {
        ...state,
        buckets: action.payload,
        loading: false
      };
    case GET_MODELS:
      return {
        ...state,
        models: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
