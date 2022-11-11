import { Avatar, Box, Button, TextField } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import React, { useState } from "react";
import { useCreatePostMutation } from "../generated/graphql";

export const QuakBox: React.FC = () => {
  const [tweetMessage, setTweetMessage] = useState("");

  const [createPostMutation] = useCreatePostMutation({
    variables: {
      message: " value for 'message'",
    },
  });

  const sendQuak = (e: any) => {
    e.preventDefault();
    /*
     * Graphgql stuff to save the Quak
     */
    createPostMutation({
      variables: {
        message: tweetMessage,
      },
    }).then(() => setTweetMessage(""));
  };

  const avatarChar = "R";

  return (
    <Box sx={{ display: "flex", alignItems: "baseline", columnGap: 2 }}>
      {/*<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />*/}
      <Avatar sx={{ bgcolor: lightGreen[600] }} aria-label="recipe">
        {avatarChar}
      </Avatar>
      <TextField
        id="quack-line"
        variant="standard"
        multiline
        placeholder="What's happening?"
        value={tweetMessage}
        onChange={(e) => setTweetMessage(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Button
        disabled={tweetMessage === undefined || tweetMessage.length === 0}
        onClick={sendQuak}
        type="submit"
        color="primary"
        variant="contained"
      >
        Quack
      </Button>
    </Box>
  );
};
