import { combineReducers } from "redux";
import app from "./app/reducer";
import post from "./post/reducer";

const rootReducer = combineReducers({
  app,
  post,
});

export default rootReducer;
