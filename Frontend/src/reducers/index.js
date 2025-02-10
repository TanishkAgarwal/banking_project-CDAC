import { combineReducers } from "redux";

import signinReducer from "./signinReducer";

const reducers = combineReducers({
  isSignin: signinReducer,
});

export default reducers;
