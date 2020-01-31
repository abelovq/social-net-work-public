import { put, call, takeEvery } from 'redux-saga/effects';
import { getPostService } from './services';

import * as types from '../constants';

function* getPostSaga({ id }) {
  try {
    yield put({ type: types.GET_POST_REQUEST });
    const response = yield call(getPostService, id);
    yield put({ type: types.GET_POST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.GET_POST_FAILURE, error });
  }
}

export default function* watchGetPostSaga() {
  yield takeEvery(types.GET_POST, getPostSaga);
}
