import { put, call, takeEvery } from 'redux-saga/effects';
import { registerUserService, loginUserService } from './services';

import { history } from '../../index'

import * as types from '../constants';

function forwardTo(location) {
  history.push(location);
}

function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload);
    yield put({ type: types.REGISTER_USER_SUCCESS, response });
    yield call(forwardTo, '/main');
  } catch(error) {
    console.log('error', error)
    yield put({ type: types.REGISTER_USER_FAILURE, error });
  }
}

function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    yield put({ type: types.LOGIN_USER_SUCCESS, response });
    yield call(forwardTo, '/main');
  } catch(error) {
    yield put({ type: types.LOGIN_USER_FAILURE, error })
  }
}

function* logOutSaga() {
  try {
    yield call(forwardTo, '/');
  } catch(error) {
    yield put({ type: types.LOGIN_USER_FAILURE, error })
  }
}

export default function* watchUserAuthentication() {
  yield takeEvery(types.REGISTER_USER, registerSaga);
  yield takeEvery(types.LOGIN_USER, loginSaga);
  yield takeEvery(types.LOGOUT_USER, logOutSaga);

}

