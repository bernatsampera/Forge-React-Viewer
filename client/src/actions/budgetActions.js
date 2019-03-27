import {
  ADD_RECORD,
  DELETE_RECORD,
  DELETE_ALL_RECORD,
  DESELECT_BUDGET_ITEM,
  SELECT_BUDGET_ITEM
} from "./types";

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

export const addRecord = record => dispatch => {
  dispatch({
    type: ADD_RECORD,
    payload: record
  });
};

export const deleteAllRecords = () => dispatch => {
  dispatch({
    type: DELETE_ALL_RECORD
  });
};

export const deleteRecord = record => dispatch => {
  dispatch({
    type: DELETE_RECORD,
    payload: record
  });
};
