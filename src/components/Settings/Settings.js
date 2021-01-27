import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

function Settings({ settingsOpen, setSettingsOpen }) {
  const classes = useStyles();

  const onClose = () => {
    setSettingsOpen(false);
  };

  return (
    <Dialog open={settingsOpen}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>Settings under construction. Hang tight!</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Settings;
