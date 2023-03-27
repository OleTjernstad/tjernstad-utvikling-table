import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#506006",
    },
    secondary: {
      main: "#19857b",
    },
    info: {
      main: "#eb34e5",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
