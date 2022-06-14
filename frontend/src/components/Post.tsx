import {
  ChatBubble,
  FavoriteBorderOutlined,
  Publish,
  Repeat,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import React from "react";
import { Reply } from "./Reply";

interface User {
  username: string;
  displayName: string;
}

export interface PostModel {
  id: string;
  user: User;
  message: string;
  postedAt: Date;
  replies?: Omit<PostModel[], "replies">;
  // replyTo: Post
}

interface PostProps {
  post: PostModel;
}

export const Post: React.FC<PostProps> = (props) => {
  const {
    post: {
      user: { username },
      postedAt,
      message,
      replies,
    },
  } = props;

  const avatarChar = username.substring(0, 1).toUpperCase();

  return (
    <StyledCard sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: lightGreen[600] }} aria-label="recipe">
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
      <Card>
        <StyledCardActions disableSpacing>
          <IconButton
            onClick={() => {
              console.log("Chat");
            }}
            aria-label="chat"
          >
            <ChatBubble />
          </IconButton>
          {replies ? (
            <IconButton
              onClick={() => {
                console.log("Repeat");
              }}
              aria-label="repeat to post"
            >
              {" "}
              <StyledBadge badgeContent={replies.length}>
                <Repeat />
              </StyledBadge>
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                console.log("Repeat");
              }}
              aria-label="repeat to post"
            >
              {" "}
              <Repeat />
            </IconButton>
          )}

          <IconButton
            onClick={() => {
              console.log("Favorite");
            }}
            aria-label="add to favorites"
          >
            <FavoriteBorderOutlined />
          </IconButton>
          <IconButton
            onClick={() => {
              console.log("Publish");
            }}
            aria-label="publish"
          >
            <Publish />
          </IconButton>
        </StyledCardActions>
      </Card>
      {replies && (
        <CardContent>
          <Typography
            component={"span"}
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {replies.map((reply, index) => {
              return <Reply key={index} reply={reply}></Reply>;
            })}
          </Typography>
        </CardContent>
      )}
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  border-bottom: 1px solid #2db83d;
  :not(:first-of-type) {
    margin-top: 10px;
  }
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "#2db83d",
    backgroundColor: "#d3ffd8",
  },
});
