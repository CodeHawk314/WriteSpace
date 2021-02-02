import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Settings from "./Settings/Settings";
import Download from "./Download";
import NewDoc from "./NewDoc";
import Files from "./Files";

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
      <NewDoc writing={writing} setWriting={setWriting} />
      <Files writing={writing} setWriting={setWriting} />
      <Download writing={writing} settings={settings} />
      <Settings settings={settings} setSettings={setSettings} />
    </div>
  );
}

export default ToolTray;
