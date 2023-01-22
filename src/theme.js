import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme();

theme = createTheme({
  palette: {
    primary: {
      main: "#2b4381",
    },
  },
  components: {
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "normal",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
