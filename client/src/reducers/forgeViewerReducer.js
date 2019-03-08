import { SET_ITEM_SELECTED } from "../actions/types";

const initialState = {
  itemSelected: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ITEM_SELECTED:
      return {
        ...state,
        itemSelected: action.payload
      };

    default:
      return state;
  }
}
