import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SettingsButton from "./Settings/SettingsButton";

const useStyles = makeStyles((theme) => ({
  tray: {
    position: "absolute",
    top: 30,
    right: 30,
    padding: 5,
    borderRadius: "50%",
    backgroundColor: theme.palette.common.lightGray,
  },
}));

function ToolTray() {
  const classes = useStyles();

  return (
    <div className={classes.tray}>
      <SettingsButton />
    </div>
  );
}

export default ToolTray;
