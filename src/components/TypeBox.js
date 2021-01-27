import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    height: "calc(70vh - 100px)",
    alignItems: "start",
    fontFamily: "Arial",
    borderStyle: "none",
  },
}));

function TypeBox(props) {
  const classes = useStyles();
  const [writing, setWriting] = useState();
  const [saveTimeout, setSaveTimeout] = useState(false);

  // Load data from last session if exists
  useEffect(() => {
    const data = localStorage.getItem("currentPad");
    if (data) {
      setWriting(data);
    }
  }, []);

  const onChange = (event) => {
    setWriting(event.target.value);

    // Save current writing to localstorage every 3 seconds when typing
    if (!saveTimeout) {
      setSaveTimeout(true);
      setTimeout(() => {
        localStorage.setItem("currentPad", event.target.value);
        setSaveTimeout(false);
      }, 3000);
    }
  };

  return (
    <TextField
      value={writing}
      onChange={onChange}
      placeholder="Start writing!"
      multiline
      autoFocus
      InputProps={{
        className: classes.input,
        disableUnderline: true,
      }}
      {...props}
    />
  );
}

export default TypeBox;
