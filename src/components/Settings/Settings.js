import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

function Settings() {
  const classes = useStyles();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const onClose = () => {
    setSettingsOpen(false);
  };

  const onSettingsButtonClick = () => {
    setSettingsOpen(true);
  };

  return (
    <>
      <IconButton onClick={onSettingsButtonClick}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={settingsOpen}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>Settings under construction. Hang tight!</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Settings;
