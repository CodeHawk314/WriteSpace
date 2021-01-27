import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Settings from "./Settings";

function SettingsButton() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const onClick = () => {
    setSettingsOpen(true);
  };

  return (
    <>
      <IconButton onClick={onClick}>
        <SettingsIcon />
      </IconButton>
      <Settings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
    </>
  );
}

export default SettingsButton;
