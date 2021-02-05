import React, { useEffect } from "react";
import "./App.css";

// Theme
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

// Analytics
import ReactGA from "react-ga";

import Layout from "./components/Layout";

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  );
}

export default App;
