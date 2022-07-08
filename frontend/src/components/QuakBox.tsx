import { Avatar, Button, Grid, styled, TextField } from "@mui/material";
import { lightGreen } from "@mui/material/colors";
import React, { useState } from "react";
import { useCreatePostMutation } from "../generated/graphql";

export const QuakBox: React.FC = () => {
  const [tweetMessage, setTweetMessage] = useState("");

  const [createPostMutation, { data }] = useCreatePostMutation({
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
    });
    console.log({ tweetMessage });
  };
  console.log(data);

  const avatarChar = "R";

  return (
    <StyledQuakBox container spacing={2}>
      <Grid item xs="auto" style={{ maxWidth: "250px" }}>
        <Avatar sx={{ bgcolor: lightGreen[600] }} aria-label="recipe">
          {avatarChar}
        </Avatar>
      </Grid>

      <Grid
        container
        item
        xs
        direction="column"
        justifyContent="center"
        alignItems="flex-end"
      >
        <TextField
          id="textarea"
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          multiline
          fullWidth
          placeholder="What's happening?"
          onChange={(e) => setTweetMessage(e.target.value)}
        />
        <StyledButton onClick={sendQuak} type="submit">
          Quak
        </StyledButton>
      </Grid>
    </StyledQuakBox>
  );
};

const StyledButton = styled(Button)`
  background-color: #d3ffd8;
  color: #2db83d;
  border: none;
  font-weight: 900;
  text-transform: inherit;
  border-radius: 30px;
  margin-top: 20px;
  height: 40px;
  width: max-content;
`;

const StyledQuakBox = styled(Grid)`
  border-bottom: 8px solid #d3ffd8;
  padding-bottom: 10px;
  width: 100%;
  margin-left: 0;
`;
