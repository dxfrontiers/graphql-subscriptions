import { Box, Grid, Typography } from "@mui/material";
import { Feed } from "./components/Feed";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs style={{ maxWidth: "250px" }}>
        <div />
      </Grid>
      <Grid item xs>
        <Box>
          <Typography variant="h2">Quacker</Typography>
        </Box>
        {<Feed />}
      </Grid>
      <Grid item xs style={{ maxWidth: "250px" }}>
        <div />
      </Grid>
    </Grid>
  );
}

export default App;
