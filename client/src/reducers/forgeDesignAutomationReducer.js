import { GET_ACTIVITIES } from "../actions/types";

const initialState = {
  activities: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: [...state.activities, action.payload]
      };
      break;
    default:
      return { ...state };
      break;
  }
}
