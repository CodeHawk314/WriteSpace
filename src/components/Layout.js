import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TypeBox from "./TypeBox";
import Settings from "./Settings/Settings";

const useStyles = makeStyles((theme) => ({
  typeBox: {
    marginTop: 100,
    marginBottom: "30vh",
    minHeight: "calc(70vh - 100px)",
    width: "80%",
  },
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Layout() {
  const classes = useStyles();
  const [settingsOpen, setSettingsOpen] = useState(true);

  return (
    <>
      <div className={classes.container}>
        <TypeBox className={classes.typeBox} />
        <Settings
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
        ></Settings>
      </div>
    </>
  );
}

export default Layout;
