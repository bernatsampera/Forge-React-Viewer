import { createMessage } from "./messages";

export const recordCreated = () => dispatch => {
  dispatch(createMessage("A record has been created", 401));
};
