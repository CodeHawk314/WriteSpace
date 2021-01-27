import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TypeBox from "./TypeBox";

import Markdown from "./Markdown";

const useStyles = makeStyles((theme) => ({
  typeBox: {
    marginTop: 100,
    marginBottom: "30vh",
    minHeight: "calc(70vh - 100px)",
    width: "40%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100%",
    alignItems: "start",
    justifyContent: "center",
  },
  markdownDiv: {
    width: "40%",
    marginTop: 100,
    display: "block",
  },
}));

function Layout() {
  const classes = useStyles();
  const [writing, setWriting] = useState("");

  // Load data from last session if exists
  useEffect(() => {
    const data = localStorage.getItem("currentPad");
    if (data) {
      setWriting(data);
    }
  }, []);

  return (
    <>
      <div className={classes.container}>
        <TypeBox
          writing={writing}
          setWriting={setWriting}
          className={classes.typeBox}
        />
        <div className={classes.markdownDiv}>
          <Markdown>{writing}</Markdown>
        </div>
      </div>
    </>
  );
}

export default Layout;
