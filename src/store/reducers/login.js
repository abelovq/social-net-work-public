import * as types from '../constants';

const initialState = {}

export default (state = initialState, action) => {
  switch(action.type) {
    case types.LOGIN_USER_SUCCESS:
        console.log('login', action.response)
        return { ...state };
    case types.LOGIN_USER_FAILURE:
      return { ...state };
    default:
      return state;
  }
}