import { put, call, takeEvery } from "redux-saga/effects";
import * as types from "../constants";

import { getAllCommentsService } from "./services";

function* getAllCommentsSaga() {
  try {
    const response = yield call(getAllCommentsService);
    yield put({ type: types.GET_ALL_COMMENTS_SUCCESS, response });
  } catch (err) {
    console.log(err);
  }
}

export default function* watchCommentsSaga() {
  yield takeEvery(types.GET_ALL_COMMENTS, getAllCommentsSaga);
  // yield takeEvery
}
