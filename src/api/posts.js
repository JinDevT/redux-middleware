import axios from "axios";
// const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n));

// { id, title, body }

export const getPosts = async () => {
  try {
    const res = await axios.get("http://localhost:3000/data/data.json");
    console.log(res.data);
    return res.data.data;
  } catch (e) {
    console.error("error!!", e);
  }
};

export const getPostsById = async (id) => {
  // try {
  //   const res = await axios.get("http://localhost:3000/data/data.json");
  //   console.log(res.find((post) => post.id === id));
  //   return res.data.data;
  // } catch (e) {
  //   console.error("error!!", e);
  // }
  // await sleep(500);
  // return posts.find((post) => post.id === id);
};
