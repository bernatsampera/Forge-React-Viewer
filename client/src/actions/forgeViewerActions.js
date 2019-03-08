import { SET_ITEM_SELECTED } from "./types";

// Select an item
export const selectItem = id => dispatch => {
  dispatch({
    type: SET_ITEM_SELECTED,
    payload: id
  });
};
