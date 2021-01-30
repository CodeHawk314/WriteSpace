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
  Select,
  MenuItem,
} from "@material-ui/core";
import { Column } from "simple-flexbox";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
  formLabel: {
    justifyContent: "flex-end",
  },
  select: {
    marginLeft: 9,
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
    setSettings({ ...settings, printRendered: e.target.value });
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
      <Dialog open={settingsOpen} className={`hidePrint`}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Column>
            <p>Settings under construction. Hang tight!</p>
            <FormControl className={classes.form}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.showOutput}
                    onChange={onSettingsShowOutputChange}
                    name="showOutput"
                    color="primary"
                  />
                }
                className={classes.formLabel}
                label="Show Live Rendered Output"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Select
                    value={settings.printRendered}
                    onChange={onSettingsPrintRenderedChange}
                    className={classes.select}
                  >
                    <MenuItem value={true}>Rendered Markdown</MenuItem>
                    <MenuItem value={false}>Raw Text</MenuItem>
                  </Select>
                }
                className={classes.formLabel}
                label="Print"
                labelPlacement="start"
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
