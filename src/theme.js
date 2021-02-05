import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "hsl(193, 84%, 44%)",
      light: "hsl(193, 64%, 74%)",
      dark: "hsl(193, 94%, 28%)",
    },
    common: {
      white: "white",
      gray: "gray",
      lightGray: "hsl(0, 0%, 91%)",
      lightestGray: "hsl(0, 0%, 96%)",
      red: "hsl(355, 78%, 46%)",
      green: "hsl(127, 43%, 59%)",
      black: "black",
      on: "hsl(165, 90%, 60%)",
      off: "hsl(0, 90%, 65%)",
      alerts: "hsla(0,0%,100%, 0.3)",
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Roboto",
  },
  spacing: 8,
  singleSpacing: 1,
});
