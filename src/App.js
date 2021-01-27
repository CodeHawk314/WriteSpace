import React from "react";
import "./App.css";

// Theme
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";

import Layout from "./components/Layout";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  );
}

export default App;
