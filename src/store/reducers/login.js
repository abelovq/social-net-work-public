import * as types from '../constants';

const initialState = {
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN_USER_SUCCESS:
        const { data } = action.response
        return { ...state, user: data };
    case types.LOGIN_USER_FAILURE:
      return { ...state };
    case types.LOGOUT_USER:
      return {
        ...state,
        user: {}
      }
    default:
      return state;
  }
}

