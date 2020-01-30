import * as types from "../constants";

import { getCommentsForUser } from "../utils";

const initialState = {
  posts: [],
  currentPost: {
    comments: []
  },
  commentsAll: []
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
    case types.GET_ALL_COMMENTS_SUCCESS:
      console.log("SHOW_COMMENT", action.response);
      const userComments = getCommentsForUser(
        action.response,
        state.currentPost.user_id
      );
      console.log("userComments", userComments);
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: [...userComments]
        },
        commentsAll: [...state.commentsAll, action.response]
      };
    default:
      return state;
  }
};
