import React from "react";

import { Post, PostModel } from "./Post";
import { QuakBox } from "./QuakBox";

export interface FeedProps {
  posts: PostModel[];
}

export const Feed: React.FC<FeedProps> = (props) => {
  const { posts } = props;
  return (
    <div>
      <div>
        <h2>Home</h2>
      </div>
      <QuakBox />
      {posts.map((post) => {
        return <Post post={post}></Post>;
      })}
    </div>
  );
};
