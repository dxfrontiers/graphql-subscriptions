import {Box, Grid, Typography} from "@mui/material";
import React from "react";
import {Feed} from "./components/Feed";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs style={{ maxWidth: "250px" }}>
        <div></div>
      </Grid>
      <Grid item xs>
        <Box>
          <Typography variant="h2">Quacker</Typography>
        </Box>
        {<Feed></Feed>}
      </Grid>
      <Grid item xs style={{ maxWidth: "250px" }}>
        <div></div>
      </Grid>
    </Grid>
  );
}

export default App;
