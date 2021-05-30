import * as types from '../constants';

const initialState = { isLogged: false }

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER_SUCCESS:
      const { data } = action.response;
      return { ...state, data, isLogged: true };
    case types.REGISTER_USER_FAILURE:
      console.log(`action.payload`, action)
      return { ...state };
    default:
      return state;
  }
}