import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../modules/posts";
import Post from "../components/Post";

function PostContainer({ postId }) {
  const { data, loading, error } = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();

  // dispatch 넣어주는 이유: 훅을 사용해서 dispatch를 가져온거이기 때문에.

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러발생!!</div>;
  if (!data) return null;
  return <Post post={data} />;
}

export default PostContainer;
