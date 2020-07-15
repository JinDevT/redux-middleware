import { delay, put, takeEvery, takeLatest } from "redux-saga/effects"; // redux-saga 미들웨어가 수행하도록 명령
// delay: 몇 초 동안 기다려라
// put: 특정 액션을 dispatch 해라
// takeEvery : 액션이 디스패치 될 때마다 코드를 실행
// takeLatest : 가장 마지막으로 들어온것만 처리해라.

// 액션 타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 1. 순수 객체를 만드는 함수를 만듦.
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

// 2. saga 작성 generator로 작성
function* increaseSaga() {
  // effect는 yield해줘야 한다.
  yield delay(1000);
  yield put(increase()); // dispatch한다. increase를 호출해서 액션객체를 만들고 그 액션을 디스패치해라
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

// 추후 INCREASE_ASYNC 디스패치 되면 saga 코드를 실행해라.
// takeEvery : INCREASE_ASYNC 액션이 디스패치할 때마다 코드를 실행해라.
// export 를 붙혀준다: 여러가지 사가를가지고 루트사가를 만들기 때문
export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // 만약 decreaseSaga에서 delay 1초 기다리는 도중에 새로운게 들어오면 기존건 무시하고
  // 가장 마지막것만 실행해라.
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
      return state;
  }
}
