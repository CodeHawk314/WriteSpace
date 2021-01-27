import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TypeBox from "./TypeBox";

const useStyles = makeStyles((theme) => ({
  typeBox: {
    margin: 100,
    marginBottom: "30vh",
    minHeight: "calc(100vh - 200px)",
    width: "100%",
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
        <TypeBox className={classes.typeBox} />
      </div>
    </>
  );
}

export default Layout;
