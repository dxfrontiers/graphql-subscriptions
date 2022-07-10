import {createTheme, ThemeOptions} from "@mui/material"

const quackerThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#2c7d4b',
    },
    secondary: {
      main: '#e40b0b',
    },
  },
};

export const quackerTheme= createTheme(quackerThemeOptions)

