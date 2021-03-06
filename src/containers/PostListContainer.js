import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../modules/posts";
import PostList from "../components/PostList";

function PostListContainer({ postId }) {
  const { data, loading, error } = useSelector((state) => state.posts.posts);
  console.log(data);
  const dispatch = useDispatch();

  // dispatch 넣어주는 이유: 훅을 사용해서 dispatch를 가져온거이기 때문에.

  useEffect(() => {
    dispatch(getPosts(postId));
  }, [dispatch, postId]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러발생!!</div>;
  if (!data) return null;
  return <PostList posts={data} />;
}

export default PostListContainer;
