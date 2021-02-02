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
  Tooltip,
} from "@material-ui/core";
import { Column } from "simple-flexbox";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    // width: "20em",
  },
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
  formLabel: {
    justifyContent: "flex-end",
    marginLeft: 0,
  },
  select: {
    margin: 5,
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

  const onSettingsDlFormatChange = (e) => {
    setSettings({ ...settings, dlFormat: e.target.value });
  };

  // Save all settings changes to localstorage
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <>
      <Tooltip title="Settings" enterDelay={1000} leaveDelay={200}>
        <IconButton onClick={onSettingsButtonClick} className={classes.button}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={settingsOpen} className={`hidePrint`}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Column>
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
                label="Show live rendered output"
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
              <FormControlLabel
                control={
                  <Select
                    value={settings.dlFormat}
                    onChange={onSettingsDlFormatChange}
                    className={classes.select}
                  >
                    <MenuItem value={"txt"}>Plain text</MenuItem>
                    <MenuItem value={"png"}>Image</MenuItem>
                    <MenuItem value={"html"}>HTML</MenuItem>
                  </Select>
                }
                className={classes.formLabel}
                label="Download Format"
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
