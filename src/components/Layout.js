import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TypeBox from "./TypeBox";
import ToolTray from "./ToolTray";

const useStyles = makeStyles((theme) => ({
  typeBox: {
    marginTop: 100,
    marginBottom: "30vh",
    minHeight: "calc(70vh - 100px)",
    width: "80%",
  },
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Layout() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <ToolTray />
        <TypeBox className={classes.typeBox} />
      </div>
    </>
  );
}

export default Layout;
