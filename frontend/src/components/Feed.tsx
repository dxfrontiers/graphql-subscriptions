import { Box } from "@mui/material";
import React from "react";

import { Post, PostModel } from "./Post";
import { QuakBox } from "./QuakBox";

export interface FeedProps {
  posts: PostModel[];
}

export const Feed: React.FC<FeedProps> = (props) => {
  const { posts } = props;
  return (
    <Box>
      <Box>
        <h2>Home</h2>
      </Box>
      <QuakBox />
      {posts.map((post, index) => {
        return <Post key={index} post={post}></Post>;
      })}
    </Box>
  );
};
