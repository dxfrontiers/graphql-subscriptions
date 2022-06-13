import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface User {
  username: string;
  displayName: string;
}

interface Post {
  id: string;
  user: User;
  message: string;
  postedAt: string; // FIXME date time
  replies?: [Post];
  // replyTo: Post
}

interface PostProps {
  post: Post;
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

  return (
    //   <div className="post">
    //     <div className="headline">
    //       <p>{username}</p>
    //       <p>{postedAt}</p>
    //     </div>
    //     <div className="body">
    //       <p>{message}</p>
    //     </div>
    //     {replies && replies.length > 0 && (
    //         <div className="replies">
    //           {replies.map(reply => (
    //               <div> key={reply.id}
    //               <p>{reply.message}</p>
    //               </div>
    //           ))}
    //         </div>
    //     )}

    //   </div>

    <Card sx={{ minWidth: 275, backgroundColor: "#c7c7fc" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {username} {postedAt}
        </Typography>
        {/*<Typography variant="h5" component="div">*/}
        {/*  */}
        {/*</Typography>*/}
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {message}
        </Typography>
        {/*<Typography variant="body2">*/}
        {/*  {message}*/}
        {/*</Typography>*/}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
