import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  styled,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import { PostModel } from "./Post";

export interface ReplyModel {
  reply: Omit<PostModel, "replies">;
}

interface ReplyProps extends ReplyModel {}

export const Reply: React.FC<ReplyProps> = (props) => {
  const {
    reply: {
      user: { username },
      postedAt,
      message,
    },
  } = props;

  const avatarChar = username.substring(0, 1).toUpperCase();

  return (
    <StyledCard sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepPurple[600] }} aria-label="recipe">
            {avatarChar}
          </Avatar>
        }
        title={username}
        subheader={postedAt.toLocaleString()}
      />
      <CardContent>
        <Typography
          component={"span"}
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          {message}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  border-bottom: 1px solid #2db83d;

  :not(:first-of-type) {
    margin-top: 10px;
  }
`;
