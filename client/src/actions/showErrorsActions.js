import { returnErrors } from "./messages";

export const elementNotSelected = () => dispatch => {
  dispatch(returnErrors("An element must be selected", 401));
};

export const elementAlreadyAdded = () => dispatch => {
  dispatch(returnErrors("The selected element is already added", 401));
};

export const priceNotSelected = () => dispatch => {
  dispatch(returnErrors("A price must be selected", 401));
};
