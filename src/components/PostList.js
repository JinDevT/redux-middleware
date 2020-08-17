import React, { useState } from "react";
import { Link } from "react-router-dom";
import { findAllByTestId } from "@testing-library/dom";

function PostList({ posts }) {
  const handleIncrease = (id) => {
    console.log("증가버튼 id: ", id);
  };

  const handleDecrease = (id) => {
    console.log("감소버튼 id: ", id);
  };
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <button onClick={() => handleDecrease(post.id)}>-</button>
          <span>{post.name}</span>
          <button onClick={() => handleIncrease(post.id)}>+</button>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
