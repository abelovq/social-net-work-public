import { fork, all } from "redux-saga/effects";
import watchUserAuthentication from "./authSaga";
import watchloadPostsSaga from "./loadPostsSaga";
import watchCreatePostSaga from "./createPostSaga";
import watchGetPostSaga from "./getPostSaga";
import watchChangePostSaga from "./changePostSaga";
import watchCommentsSaga from "./commentsSaga";

export default function* rootSaga() {
  yield all([
    fork(watchUserAuthentication),
    fork(watchloadPostsSaga),
    fork(watchCreatePostSaga),
    fork(watchGetPostSaga),
    fork(watchChangePostSaga),
    fork(watchCommentsSaga)
  ]);
}
