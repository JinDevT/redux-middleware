// api 요청하면 진행중, 성공했을 떄 데이터의 상태, 실패했을 떄 에러의 상태를 관리
import * as postsAPI from "../api/posts";
import {
  reducerUtils,
  createPromiseThunk,
  handleAsyncActions,
} from "../lib/asyncUtils";
import { call, put, takeEvery } from "redux-saga/effects";

// api 요청 할때 액션을 만들어야 하는데 각 api 마다 세개씩 만든다.

const GET_POSTS = "GET_POSTS"; // 특정 요청이 시작됬다. 그걸 알리는 액션
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"; // 요청이 끝날 때 성공 데이터를 담겠다.
const GET_POSTS_ERROR = "GET_POSTS_ERROR"; // 오류가 나고 로딩이 끝나고 에러의 상태를 담겠다.

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
// export const getPost = createPromiseThunk(GET_POST, postAPI.getPostsById);

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({
  type: GET_POST,
  payload: id,
  meta: id,
});

function* getPostsSaga() {
  try {
    const posts = yield call(postsAPI.getPosts);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    });
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: e,
      error: true,
    });
  }
}

function* getPostSaga(action) {
  const id = action.payload;
  try {
    const post = yield call(postsAPI.getPostsById, id);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id,
    });
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      payload: e,
      error: true,
      meta: id,
    });
  }
}

//action 모니터링
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

const getPostsReducer = handleAsyncActions(GET_POSTS, "posts");
const getPostReducer = handleAsyncActions(GET_POST, "post");
// 리듀서
export default function posts(state = initialState, action) {
  switch (action.type) {
    // 세개의 액션 중 하나면 실행하겠다~
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReducer(state, action);
    default:
      return state;
  }
}
