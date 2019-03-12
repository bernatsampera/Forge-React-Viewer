import { SET_ITEM_SELECTED, SET_VIEWER_ACCESS } from "../actions/types";

const initialState = {
  itemSelected: null,
  viewer_token: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ITEM_SELECTED:
      return {
        ...state,
        itemSelected: action.payload
      };
    case SET_VIEWER_ACCESS:
      return {
        ...state,
        viewer_token: action.payload
      };
    default:
      return state;
  }
}
