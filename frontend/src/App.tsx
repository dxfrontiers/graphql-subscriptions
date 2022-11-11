import {
  Container,
  Divider,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Feed } from "./components/Feed";
import { firebaseAuth } from "./firebase";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";

import { ApolloProvider } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { QuakBox } from "./components/QuakBox";
import { clientFactory } from "./graphql/client";
import { quackerTheme } from "./theme";

function App() {
  const [user, loading] = useAuthState(firebaseAuth);
  const [token, setToken] = useState<string>();

  const client = useMemo(() => {
    if (user) user.getIdToken().then(setToken);
    if (token) {
      return clientFactory(token);
    }
    return undefined;
  }, [user, token]);
  return (
    <>
      {loading && "Loading"}
      {!loading && !user && (
        <Routes>
          <Route path="*" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      )}
      {!loading && user && client && (
        <ApolloProvider client={client}>
          <React.StrictMode>
            <ThemeProvider theme={quackerTheme}>
              <NavBar />
              <Container maxWidth="lg" sx={{ marginTop: "6em" }}>
                <Grid container>
                  <Grid xs={4} sx={{ paddingRight: 6 }}>
                    <Typography variant="h6">
                      Welcome to Quacker, your convenient short message service.
                    </Typography>
                    <Typography variant="button">
                      Go ahead and quack to the world!
                    </Typography>
                  </Grid>
                  <Grid xs={8}>
                    <QuakBox />
                    <Divider sx={{ paddingTop: 2, paddingBottom: 5 }} />
                    <Feed />
                  </Grid>
                </Grid>
              </Container>
            </ThemeProvider>
          </React.StrictMode>
        </ApolloProvider>
      )}
    </>
  );
}

export default App;
