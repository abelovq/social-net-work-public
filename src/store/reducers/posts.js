import * as types from "../constants";

const initialState = {
  posts: [],
  currentPost: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.response
      };
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.response]
      };
    case types.GET_POST_SUCCESS:
      return {
        ...state,
        currentPost: action.response
      };
    default:
      return state;
  }
};
