// 반복된 코드가 있어 리펙토링

// 첫 번쨰 파라미터: 요청이 시작했음을 알리는 타입
// 두 번째 파라미터: postAPI.getPosts() 등 프로미스를 만들어주는 함수
export const createPromiseThunk = (type, promiseCreator) => {
  // 두가지 액션을 준비
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  // 특정 함수를 만들어서 반환
  // thunk를 만들어주는 함수
  return (param) => async (dispatch) => {
    dispatch({ type });
    try {
      // payload: 결과를 가져와서 액션을 디스패치 할 때 객체 안에 타입
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true,
      });
    }
  };
};

// type: 사전에 만들었던 createPromiseThunk와 똑같음.
// key: 각 액션들마다 관리하는 키가 다름 . (posts, post)
export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  // type, SUCCESS, ERROR에 대하여 리듀서 작성 . 그리고 해당 리듀서를 사용
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: true,
    error: null,
  }),
  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null,
  }),
  success: (data) => ({
    data,
    loading: false,
    error: null,
  }),
  error: (error) => ({
    data: null,
    loading: false,
    error,
  }),
};
