import { combineReducers } from "redux";

import switchMode from "./switchMode";
import authReducer from "./authReducer";
import alertReducer from "./alertReducer";
import playerReducer from "./playerReducer";

export default combineReducers({
  playerReducer,
  switchMode,
  authReducer,
  alertReducer,
});
