import React, { useState } from "react";
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
    fontFamily: "Roboto",
    fontSize: "1rem",
  },
}));

function TextCounter({ writing, open }) {
  const classes = useStyles();
  const [selected, setSelected] = useState();

  document.onselectionchange = function () {
    setSelected(document.getSelection().toString());
  };

  return (
    <>
      {open && (
        <div className={`${classes.container} hidePrint`}>
          {selected && "Selected: "}
          {(selected || writing).match(/(?:\w|['-]+\w)+/g)?.length || 0} words |{" "}
          {(selected || writing).length} chars
        </div>
      )}
    </>
  );
}

export default TextCounter;
