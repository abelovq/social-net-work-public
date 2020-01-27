import * as types from '../constants';

export const registerUser = (data) => {
  console.log(data)
  return {
    type: types.REGISTER_USER,
    data
  }
}

export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER, 
    data
  }
}