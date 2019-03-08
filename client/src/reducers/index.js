import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import forgeAuthReducer from "./forgeAuthReducer";
import forgeManagementReducer from "./forgeManagementReducer";
import forgeDerivativeReducer from "./forgeDerivativeReducer";
import forgeViewerReducer from "./forgeViewerReducer";

export default combineReducers({
  forgeAuth: forgeAuthReducer,
  forgeManagement: forgeManagementReducer,
  forgeDerivative: forgeDerivativeReducer,
  forgeViewer: forgeViewerReducer,
  errors: errorReducer
});
