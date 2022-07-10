import {AppBar, Box, Container, Divider, Grid, Icon, Toolbar, Typography} from "@mui/material";
import {Feed} from "./components/Feed";

import {ReactComponent as Logo} from "./assets/wipp_Frog_silhouette.svg"
import {QuakBox} from "./components/QuakBox"

function App() {
  return (
      <>
        <AppBar position="fixed">
            <Container maxWidth="lg">
              <Toolbar>
              <Icon fontSize="large"><Logo/></Icon>
              <Typography variant="h6" component="header" sx={{ marginLeft: "1em", flexGrow: 1 }}>
                Quacker
              </Typography>
              </Toolbar>
            </Container>
        </AppBar>
        <Container maxWidth="lg" sx={{marginTop: "6em"}}>
          <Grid container>
            <Grid xs={4} sx={{paddingRight: 6}}>
              <Typography variant="h6">
                Welcome to Quacker, your convenient short message service. 
              </Typography>
              <Typography variant="button">
                Go ahead and quack to the world! 
              </Typography>
            </Grid>
            <Grid xs={8}>
              <QuakBox/>
              <Divider sx={{paddingTop: 2, paddingBottom: 5}}/>
              <Feed/>
            </Grid>
          </Grid>
        </Container>
      </>
  );
}

export default App;
