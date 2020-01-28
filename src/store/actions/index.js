import * as types from "../constants";

export const registerUser = data => {
  console.log(data);
  return {
    type: types.REGISTER_USER,
    data
  };
};

export const loginUser = data => {
  return {
    type: types.LOGIN_USER,
    data
  };
};

export const logOut = () => {
  localStorage.clear();
  return {
    type: types.LOGOUT_USER
  };
};

export const loadPosts = () => {
  return {
    type: types.LOAD_POSTS
  };
};

export const createPost = data => {
  return {
    type: types.CREATE_POST,
    data
  };
};

export const getPost = id => {
  return {
    type: types.GET_POST,
    id
  };
};
