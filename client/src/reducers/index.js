import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import forgeAuthReducer from "./forgeAuthReducer";
import forgeManagementReducer from "./forgeManagementReducer";
import forgeDerivativeReducer from "./forgeDerivativeReducer";
import forgeViewerReducer from "./forgeViewerReducer";
import budgetReducer from "./budgetReducer";
import messageReducer from "./messageReducer";
import forgeDesignAutomationReducer from "./forgeDesignAutomationReducer";

export default combineReducers({
  forgeAuth: forgeAuthReducer,
  forgeManagement: forgeManagementReducer,
  forgeDerivative: forgeDerivativeReducer,
  forgeViewer: forgeViewerReducer,
  forgeDesignAutomation: forgeDesignAutomationReducer,
  budget: budgetReducer,
  errors: errorReducer,
  messages: messageReducer
});
