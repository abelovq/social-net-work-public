import * as types from '../constants'

const initialState = {
  user: {},
  error: false,
  isAuth: JSON.parse(localStorage.getItem('authToken')),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      const { data } = action.response
      return { ...state, user: data, error: false, isAuth: true }
    case types.LOGIN_USER_FAILURE:
      return { ...state, error: true }
    case types.LOGOUT_USER:
      return {
        ...state,
        user: {},
        error: false,
        isAuth: false,
      }
    case types.REGISTER_USER_SUCCESS:
      const { data: userReg } = action.response
      return { ...state, error: false, user: userReg }
    case types.GET_CURRENT_USER_SUCCESS:
      const { data: user } = action.response
      return { ...state, user, isAuth: true }
    case types.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
      }
    default:
      return state
  }
}
