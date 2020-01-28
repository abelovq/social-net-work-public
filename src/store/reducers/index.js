import { combineReducers } from "redux";
import register from "./register";
import login from "./login";
import posts from "./posts";

export default combineReducers({
  register,
  login,
  posts
});
