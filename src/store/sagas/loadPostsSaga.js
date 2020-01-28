import { put, call, takeEvery } from "redux-saga/effects";
import { loadPostsService } from "./services";

import * as types from "../constants";

function* loadPostsSaga() {
  try {
    const response = yield call(loadPostsService);
    yield put({ type: types.LOAD_POSTS_SUCCESS, response });
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.LOAD_POSTS_FAILURE, error });
  }
}

export default function* watchloadPostsSaga() {
  yield takeEvery(types.LOAD_POSTS, loadPostsSaga);
}
