import {
  AppBar,
  Button,
  Container,
  Icon,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

import { ReactComponent as Logo } from "../assets/wipp_Frog_silhouette.svg";
import { signOut } from "../firebase";

export const NavBar: React.FC = () => {
  return (
    <AppBar position="fixed">
      <StyledContainer maxWidth="lg">
        <Icon fontSize="large">
          <Logo />
        </Icon>
        <Typography
          variant="h6"
          component="header"
          sx={{ marginLeft: "1em", flexGrow: 1 }}
        >
          Quacker
        </Typography>
        <StyledButton
          type="submit"
          variant="outlined"
          onClick={() => signOut()}
        >
          Log Out
        </StyledButton>
      </StyledContainer>
    </AppBar>
  );
};

const StyledButton = styled(Button)`
  color: #fff;
  border: 1px solid #fff;
  :hover {
    background: rgb(30, 87, 52);
  }
`;

const StyledContainer = styled(Container)`
  display: inherit;
  margin-top: 10px;
  margin-bottom: 10px;
`;
