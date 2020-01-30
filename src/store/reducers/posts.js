import * as types from "../constants";

import { sortItemsByDate } from "../utils";

const initialState = {
  posts: [],
  currentPost: {
    comments: []
  },
  loading: false
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
    case types.GET_POST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_POST_SUCCESS:
      const { response } = action;
      return {
        ...state,
        loading: false,
        currentPost: {
          ...state.currentPost,
          ...response,
          comments: [...state.currentPost.comments]
        }
      };
    case types.GET_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: [...sortItemsByDate(action.response)]
        }
      };
    case types.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: [action.response, ...state.currentPost.comments]
        }
      };
    case types.DELETE_COMMENT_SUCCESS:
      const newComments = state.currentPost.comments.filter(
        comment => comment.id !== action.response
      );
      return {
        ...state,
        currentPost: { ...state.currentPost, comments: newComments }
      };
    default:
      return state;
  }
};
