import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import posts, { postsSaga } from "./posts";
import { all } from "redux-saga/effects";

// 리듀서의 이름
const rootReducer = combineReducers({ counter, posts });
// all: 모든 사가를 불러온다?
// 다른곳에 사용할 수 있게 내보내준다.
export function* rootSaga() {
  yield all([counterSaga(), postsSaga()]);
}
export default rootReducer;
