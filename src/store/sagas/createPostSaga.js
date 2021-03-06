import { put, call, takeEvery } from 'redux-saga/effects';
import { createPostService } from './services';

import * as types from '../constants';

function* createPostSaga(payload) {
  try {
    const response = yield call(createPostService, payload);
    yield put({ type: types.CREATE_POST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.CREATE_POST_FAILURE, error });
  }
}

export default function* watchCreatePostSaga() {
  yield takeEvery(types.CREATE_POST, createPostSaga);
}
