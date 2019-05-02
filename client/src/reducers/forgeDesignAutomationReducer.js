import {
  GET_ACTIVITIES,
  GET_MODEL_INFO,
  ACTIVITY_FINISHED,
  ACTIVITY_STARTED
} from "../actions/types";

const initialState = {
  activities: [],
  modelData: {},
  inRequest: false
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
    case ACTIVITY_STARTED:
      return {
        ...state,
        inRequest: true,
        loading: true
      };
    case ACTIVITY_FINISHED:
      return {
        ...state,
        inRequest: false,
        loading: false
      };
    default:
      return state;
  }
}
