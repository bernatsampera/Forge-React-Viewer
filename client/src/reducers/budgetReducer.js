import {
  ADD_RECORD,
  DELETE_RECORD,
  DELETE_ALL_RECORD,
  SELECT_BUDGET_ITEM,
  DESELECT_BUDGET_ITEM,
  SELECT_PRICE,
  DESELECT_PRICE
} from "../actions/types";

const initialState = {
  itemSelected: null,
  priceSelected: null,
  records: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_BUDGET_ITEM:
      return {
        ...state,
        itemSelected: action.payload
      };
    case DESELECT_BUDGET_ITEM:
      return {
        ...state,
        itemSelected: null
      };
    case SELECT_PRICE:
      return {
        ...state,
        priceSelected: action.payload
      };
    case DESELECT_PRICE:
      return {
        ...state,
        priceSelected: null
      };
    case ADD_RECORD:
      return {
        ...state,
        records: [...state.records, action.payload],
        priceSelected: null,
        itemSelected: null
      };
    case DELETE_RECORD:
      return {
        ...state,
        records: [
          ...state.records.slice(0, action.payload),
          ...state.items.slice(action.payload + 1)
        ]
      };
    case DELETE_ALL_RECORD:
      return {
        ...state,
        records: []
      };
    default:
      return state;
  }
}
