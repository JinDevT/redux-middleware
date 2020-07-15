const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// { id, title, body }
const posts = [
  {
    id: 1,
    title: "리덕스 미들웨어",
    body: "리덕스 미들웨어를 직접 만들어보면 이해가 쉽다.",
  },
  {
    id: 2,
    title: "redux-thunk를 사용해보자.",
    body: "redux-thunk를 사용해서 비동기 작업을 처리해보자..",
  },
  {
    id: 3,
    title: "redux-saga를 사용해보자.",
    body: "redux-saga를 사용해서 비동기 작업을 처리해보자..",
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostsById = async (id) => {
  await sleep(500);
  return posts.find((post) => post.id === id);
};
