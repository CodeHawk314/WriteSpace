import React from "react";
import { TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    height: "100%",
    alignItems: "start",
    fontFamily: "Arial",
    borderStyle: "none",
  },
  textField: {
    borderStyle: "none",
    padding: 1,
  },
}));

function TypeBox(props) {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textField}
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
