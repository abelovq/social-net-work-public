import { put, call, takeEvery } from 'redux-saga/effects';
import * as types from '../constants';

import {
  getPostCommentsService,
  addCommentService,
  changeCommentService,
  deleteCommentService,
} from './services';

function* getPostCommentsSaga({ id }) {
  try {
    const response = yield call(getPostCommentsService, id);
    yield put({ type: types.GET_POST_COMMENTS_SUCCESS, response });
  } catch (err) {
    yield put({ type: types.GET_POST_COMMENTS_FAILURE, err });
  }
}

function* addCommentSaga({
  data: { message, commentable_id: id, commentable_type: type },
}) {
  try {
    const response = yield call(addCommentService, message, id, type);
    yield put({ type: types.ADD_COMMENT_SUCCESS, response });
  } catch (err) {
    yield put({ type: types.ADD_COMMENT_FAILURE, err });
  }
}

function* changeComment({ data: { message, id } }) {
  try {
    const response = yield call(changeCommentService, message, id);
    yield put({ type: types.CHANGE_COMMENT_SUCCESS, response });
  } catch (err) {
    yield put({ type: types.CHANGE_COMMENT_FAILURE, err });
  }
}

function* deleteCommentSaga({ id }) {
  try {
    const response = yield call(deleteCommentService, id);
    yield put({ type: types.DELETE_COMMENT_SUCCESS, response });
  } catch (err) {
    yield put({ type: types.DELETE_COMMENT_FAILURE, err });
  }
}

export default function* watchCommentsSaga() {
  yield takeEvery(types.GET_POST_COMMENTS, getPostCommentsSaga);
  yield takeEvery(types.ADD_COMMENT, addCommentSaga);
  yield takeEvery(types.CHANGE_COMMENT, changeComment);
  yield takeEvery(types.DELETE_COMMENT, deleteCommentSaga);
}
