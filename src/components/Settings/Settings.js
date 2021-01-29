import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Column } from "simple-flexbox";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
}));

function Settings({ settings, setSettings }) {
  const classes = useStyles();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const onClose = () => {
    setSettingsOpen(false);
  };

  const onSettingsButtonClick = () => {
    setSettingsOpen(true);
  };

  const onSettingsShowOutputChange = (e) => {
    setSettings({ ...settings, showOutput: e.target.checked });
  };

  const onSettingsPrintRenderedChange = (e) => {
    setSettings({ ...settings, printRendered: e.target.checked });
  };

  // Save all settings changes to localstorage
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <>
      <IconButton onClick={onSettingsButtonClick} className={classes.button}>
        <SettingsIcon />
      </IconButton>
      <Dialog open={settingsOpen}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Column>
            <p>Settings under construction. Hang tight!</p>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.showOutput}
                    onChange={onSettingsShowOutputChange}
                    name="showOutput"
                    color="primary"
                  />
                }
                label="Show Live Rendered Output"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.printRendered}
                    onChange={onSettingsPrintRenderedChange}
                    name="printRendered"
                    color="primary"
                  />
                }
                label="Print rendered markdown"
              />
            </FormControl>
          </Column>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Settings;
