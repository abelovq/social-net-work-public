import { put, call, takeEvery } from "redux-saga/effects";
import { getPostService } from "./services";

import * as types from "../constants";

function* getPostSaga(payload) {
  console.log("payload", payload);
  try {
    const response = yield call(getPostService, payload.id);
    yield put({ type: types.GET_POST_SUCCESS, response });
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.GET_POST_FAILURE, error });
  }
}

export default function* watchGetPostSaga() {
  yield takeEvery(types.GET_POST, getPostSaga);
}
