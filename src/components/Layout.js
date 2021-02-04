import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TypeBox from "./TypeBox";
import ToolTray from "./ToolTray";
import TextCounter from "./TextCounter";

import Markdown from "./Markdown";
import Print from "./Print";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    alignItems: "start",
    justifyContent: "center",
  },
  center: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: "80rem",
    boxSizing: "border-box",
    alignItems: "start",
    justifyContent: "center",
  },
  typeBox: {
    margin: 10,
    marginTop: 100,
    marginBottom: "30vh",
    padding: 10,
    minHeight: "calc(70vh - 120px)",
    width: "100%",
    minWidth: "20vh",
    maxWidth: "60rem",
  },
  markdownDiv: {
    margin: 10,
    marginTop: 100,
    marginBottom: 100,
    padding: 10,
    width: "100%",
    minWidth: "20vh",
    display: "block",
  },
  divider: {
    position: "absolute",
    top: "5vh",
    bottom: "5vh",
    margin: "auto",
    width: 2,
    borderRadius: 1,
    backgroundColor: theme.palette.common.lightGray,
  },
  hide: {
    display: "none",
  },
}));

function Layout() {
  const classes = useStyles();
  const [writing, setWriting] = useState("");

  const defaultSettings = {
    showOutput: true,
    showTextCount: false,
    printRendered: true,
    dlFormat: "txt",
    copyFormat: "png",
    katexInline: false,
    katexBlock: true,
    fontSize: 12,
    fontFamily: "Helvetica, sans-serif",
  };
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || defaultSettings
  );

  // Load data from last session if exists
  useEffect(() => {
    const data = localStorage.getItem("currentPad");
    data && setWriting(data);

    if (!localStorage.getItem("currentPadCreatedOn") || !data) {
      localStorage.setItem("currentPadCreatedOn", Date.now());
    }
  }, []);

  return (
    <>
      <div
        className={classes.container}
        style={{
          fontSize: `${settings.fontSize}pt`,
          fontFamily: settings.fontFamily,
        }}
      >
        <div className={classes.center}>
          <TypeBox
            writing={writing}
            setWriting={setWriting}
            className={`${classes.typeBox} typebox`}
          />
          {settings.showOutput && (
            <>
              <div className={`${classes.divider} hidePrint`} id="divider" />
              <div className={classes.markdownDiv} id="markdownOutput">
                <Markdown settings={settings}>{writing}</Markdown>
              </div>
            </>
          )}
          <TextCounter
            writing={writing}
            open={settings.showTextCount}
          ></TextCounter>
        </div>
        <ToolTray
          writing={writing}
          setWriting={setWriting}
          settings={settings}
          setSettings={setSettings}
        />
        <Print settings={settings} setSettings={setSettings} />
        <div
          className={`${classes.markdownDiv} hidePrint`}
          id="hiddenOutput"
        ></div>
      </div>
    </>
  );
}

export default Layout;
