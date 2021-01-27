import React from "react";
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
  return (
    <TextField
      multiline
      placeholder="Start writing!"
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
