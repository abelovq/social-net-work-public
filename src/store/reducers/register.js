import * as types from '../constants';

const initialState = {
    id: null,
    uid: null,
    first_name: '',
    last_name: '',
    email: ''
}

export default (state = initialState, action) => {
  let response = action.response;
    console.log(response)
  switch(action.type) {
    case types.REGISTER_USER_SUCCESS:
        console.log('action', action)
      return { ...state, response };
    case types.REGISTER_USER_FAILURE:
      return { ...state, response };
    default:
      return state;
  }
}