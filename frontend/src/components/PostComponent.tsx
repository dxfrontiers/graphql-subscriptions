import {Avatar, Card, CardContent, CardHeader, Typography,} from "@mui/material";
import {lightGreen} from "@mui/material/colors";
import React from "react";
import {Post} from "../generated/graphql";

export interface PostComponentProps {
  post: Post;
}

export const PostComponent: React.FC<PostComponentProps> = (props) => {
  const {
    post: {
      user: {username},
      postedAt,
      message,
      replies,
    },
  } = props;

  const avatarChar = username.substring(0, 1).toUpperCase();

  return (
      <Card sx={{marginBottom: 5, marginTop: 5}} variant="outlined">
        <CardHeader
            avatar={
              <Avatar sx={{bgcolor: lightGreen[600]}} aria-label="recipe">
                {avatarChar}
              </Avatar>
            }
            title={username}
            subheader={new Date(postedAt).toLocaleString()}
        />
        <CardContent>
          <Typography
              component={"span"}
              sx={{fontSize: 18}}
              gutterBottom
          >
            {message}
          </Typography>
        </CardContent>
      </Card>
  );
};
