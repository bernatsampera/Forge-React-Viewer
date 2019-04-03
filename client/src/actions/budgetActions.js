import {
  ADD_RECORD,
  DELETE_RECORD,
  DELETE_ALL_RECORD,
  DESELECT_BUDGET_ITEM,
  SELECT_BUDGET_ITEM,
  SELECT_PRICE,
  DESELECT_PRICE
} from "./types";

// buget_item: elemnt to add in a record
// price: price to add in a record along with the item
// record: Maps a item to a price

// Budget Item
export const selectBudgetItem = item => dispatch => {
  dispatch({
    type: SELECT_BUDGET_ITEM,
    payload: item
  });
};

export const deselectBudgetItem = () => dispatch => {
  dispatch({
    type: DESELECT_BUDGET_ITEM
  });
};

// Price
export const selectPrice = price => dispatch => {
  dispatch({
    type: SELECT_PRICE,
    payload: price
  });
};

export const deselectPrice = () => dispatch => {
  dispatch({
    type: DESELECT_PRICE
  });
};

// Record
export const addRecord = record => dispatch => {
  dispatch({
    type: ADD_RECORD,
    payload: record
  });
};

export const deleteRecord = record => dispatch => {
  dispatch({
    type: DELETE_RECORD,
    payload: record
  });
};

export const deleteAllRecords = () => dispatch => {
  dispatch({
    type: DELETE_ALL_RECORD
  });
};


