import { put, call, takeEvery } from 'redux-saga/effects';
import { registerUserService, loginUserService } from './services';

import * as types from '../constants';

function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload);
    yield put({ type: types.REGISTER_USER_SUCCESS, response })
    ;
  } catch(error) {
    yield put({ type: types.REGISTER_USER_FAILURE, error });
  }
}

// function* loginSaga(payload) {
//   try {
//     const response = yield call(loginUserService, payload);
//     yield [
//       put({ type: types.LOGIN_USER_SUCCESS, response })
//     ];
//   } catch(error) {
//     yield put({ type: types.LOGIN_USER_ERROR, error })
//   }
// }

export default function* watchUserAuthentication() {
  yield takeEvery(types.REGISTER_USER, registerSaga);
//   yield takeEvery(types.LOGIN_USER, loginSaga);
}