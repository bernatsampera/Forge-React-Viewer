import { SET_FORGE_ACCESS } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  forgeUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FORGE_ACCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        forgeUser: action.payload
      };
    default:
      return state;
  }
}
