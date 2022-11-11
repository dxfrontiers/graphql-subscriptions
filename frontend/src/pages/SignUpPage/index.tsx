import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useReducer } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase";

interface State {
  errorCode?: string;
  signUpEmail: string;
  signUpEmailError?: string;
  signUpPassword: string;
  signUpPasswordError?: string;
  inputComplete: boolean;
}

interface Action {
  type: "change-email" | "change-password" | "error";
  payload?: string;
}

const reducer = (state: State, action: Action): State => {
  const applyAction = (state: State, action: Action) => {
    switch (action.type) {
      case "change-email":
        return {
          ...state,
          signUpEmail: action.payload || "",
          signUpEmailError: undefined,
        };
      case "change-password":
        return {
          ...state,
          signUpPassword: action.payload || "",
          signUpPasswordError: undefined,
        };
      case "error":
        if (action.payload) {
          switch (action.payload) {
            case "auth/email-already-in-use":
              return {
                ...state,
                signUpEmailError: "This eMail address is already in use",
              };
            case "auth/invalid-email":
              return { ...state, signUpEmailError: "Invalid eMail address" };
            case "auth/weak-password":
              return {
                ...state,
                signUpPasswordError: "Provided password is too weak",
              };
          }
        }
        // reset of the error messages
        return {
          ...state,
          signUpEmailError: undefined,
          signUpPasswordError: undefined,
        };
    }
    return { ...state };
  };

  const updatedState = applyAction(state, action);

  return {
    ...updatedState,
    inputComplete:
      updatedState.signUpPasswordError === undefined &&
      updatedState.signUpEmailError === undefined &&
      updatedState.signUpEmail.includes("@") &&
      updatedState.signUpPassword.length > 0,
  };
};

export const SignUpPage = () => {
  const [createUserWithEmailAndPassword, , , error] =
    useCreateUserWithEmailAndPassword(firebaseAuth);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    errorCode: undefined,
    signUpEmail: "",
    signUpPassword: "",
    inputComplete: false,
  });

  useEffect(() => {
    console.log(error);

    dispatch({ type: "error", payload: error?.code || undefined });
  }, [error]);

  const setSignUpEmail = (email: string) =>
    dispatch({ type: "change-email", payload: email });
  const setSignUpPassword = (password: string) =>
    dispatch({ type: "change-password", payload: password });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.signUpEmail}
                  onChange={(e) => setSignUpEmail(e.currentTarget.value)}
                  error={!!state.signUpEmailError}
                  helperText={state.signUpEmailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={state.signUpPassword}
                  onChange={(e) => setSignUpPassword(e.currentTarget.value)}
                  error={!!state.signUpPasswordError}
                  helperText={state.signUpPasswordError}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!state.inputComplete}
              onClick={() =>
                createUserWithEmailAndPassword(
                  state.signUpEmail,
                  state.signUpPassword
                )
              }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate("/")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
