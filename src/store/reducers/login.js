import * as types from "../constants";

const initialState = {
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
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
      console.log(user);
      return { ...state };
    //   ...state,
    //   user: { ...user, user }
    // };
    case types.GET_CURRENT_USER_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
};
