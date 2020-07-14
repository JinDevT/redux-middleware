const myLogger = (store) => (next) => (action) => {
  console.log(action);
  console.log("\t이전: ", store.getState());
  const result = next(action); // action을 다음 미들웨어 만약 없다면 리듀서한테 전달하겠다
  console.log("\t다음: ", store.getState()); //  액션이 리듀서에서 처리가 된 다음에 그 다음 상태를 가져와서 출력
  return result; // 반환하는 result는 컨테이너에서 디스패치 됬을 때 그 결과물을 미들웨어에서 리턴하는 값
};

export default myLogger;
