import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Settings from "./Settings/Settings";
import Download from "./Download";

const useStyles = makeStyles((theme) => ({
  tray: {
    position: "absolute",
    top: 30,
    right: 30,
    padding: 3,
    borderRadius: "9999px",
    // backgroundColor: theme.palette.common.lightGray,
  },
}));

function ToolTray({ writing, setWriting, settings, setSettings, ...props }) {
  const classes = useStyles();

  return (
    <div className={`${classes.tray} hidePrint`} id="tooltray">
      <Download writing={writing} />
      <Settings settings={settings} setSettings={setSettings} />
    </div>
  );
}

export default ToolTray;
