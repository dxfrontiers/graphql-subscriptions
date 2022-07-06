import { Grid } from "@mui/material";
import React from "react";
import { Feed } from "./components/Feed";
import { Sidebar } from "./components/Sidebar";
import { postsFixture } from "./fixtures/posts.fixture";
import { Post, useSubscribeTimelineSubscription } from "./generated/graphql";

function App() {
  const { data, loading, error } = useSubscribeTimelineSubscription();
  console.log({ data });

  return (
    <Grid container spacing={2}>
      <Grid item xs style={{ maxWidth: "250px" }}>
        <Sidebar />
      </Grid>
      <Grid item xs>
        {<Feed posts={postsFixture}></Feed>}
      </Grid>
      <Grid item xs style={{ maxWidth: "250px" }}>
        <div></div>
      </Grid>
    </Grid>
  );
}

export default App;
