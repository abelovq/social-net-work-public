import * as types from "../constants";

const initialState = {
  user: {},
  isAuth: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      const { data } = action.response;
      return { ...state };
    case types.LOGIN_USER_FAILURE:
      return { ...state };
    case types.LOGOUT_USER:
      return {
        ...state,
        user: {}
      };
    case types.GET_CURRENT_USER_SUCCESS:
      const { data: user } = action.response;
      console.log("SUCCESS", action.response);
      return {
        ...state,
        user,
        isAuth: true
      };
    case types.GET_CURRENT_USER_FAILURE:
      console.log("FAIl");
      return {
        ...state,
        isAuth: false
      };
    default:
      return state;
  }
};
