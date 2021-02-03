import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    bottom: 30,
    left: 30,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.common.lightestGray,
    boxShadow: "0px 0px 5px lightgrey",
  },
}));

function TextCounter({ writing, open }) {
  const classes = useStyles();

  return (
    <>
      {open && (
        <div className={`${classes.container} hidePrint`}>
          {writing.match(/(?:\w|['-]+\w)+/g)?.length || 0} words |{" "}
          {writing.length} chars
        </div>
      )}
    </>
  );
}

export default TextCounter;
