import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Settings from "./Settings/Settings";

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

function ToolTray({ settings, setSettings, ...props }) {
  const classes = useStyles();

  return (
    <div className={classes.tray}>
      <Settings settings={settings} setSettings={setSettings} />
    </div>
  );
}

export default ToolTray;
