import { Grid } from "@mui/material";
import React from "react";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item style={{ width: "250px" }}>
        <Sidebar />
      </Grid>
      <Grid item xs>
        {
          <Post
            post={{
              id: "123",
              user: { username: "alfons", displayName: "Alfons User" },
              message: "this is my most important message of the day!",
              postedAt: "1h",
            }}
          ></Post>
        }
      </Grid>
    </Grid>
  );
}

export default App;
