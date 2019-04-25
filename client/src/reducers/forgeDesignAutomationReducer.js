import { GET_ACTIVITIES, GET_MODEL_INFO } from "../actions/types";

const initialState = {
  activities: [],
  modelData: {} // TODO: Move modelData to another place
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload
      };
    case GET_MODEL_INFO:
      return {
        ...state,
        modelData: action.payload
      };
    default:
      return state;
  }
}
