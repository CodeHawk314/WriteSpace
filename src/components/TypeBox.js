import React, { useState } from "react";
import { TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    minHeight: "calc(70vh - 120px)",
    alignItems: "start",
    fontFamily: "Arial",
    borderStyle: "none",
  },
}));

function TypeBox({ writing, setWriting, ...props }) {
  const classes = useStyles();
  const [saveTimeout, setSaveTimeout] = useState(false);

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
    <>
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
        id="textField"
      />
      <div
        id="textFieldCopy"
        style={{ display: "none" }}
        className="showPrint"
      />
    </>
  );
}

export default TypeBox;
