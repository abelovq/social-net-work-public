import { put, call, takeEvery } from 'redux-saga/effects';
import { changePostService } from './services';

import * as types from '../constants';

function* changePostSaga(payload) {
  try {
    const response = yield call(changePostService, payload);
    yield put({ type: types.CHANGE_POST_SUCCESS, response });
  } catch (error) {
    yield put({ type: types.CHANGE_POST_FAILURE, error });
  }
}

export default function* watchChangePostSaga() {
  yield takeEvery(types.CHANGE_POST, changePostSaga);
}
