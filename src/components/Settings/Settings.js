import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  Tooltip,
  Link,
} from "@material-ui/core";
import { Column } from "simple-flexbox";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    width: "18rem",
  },
  dialogActions: {
    justifyContent: "space-between",
    padding: "8px 16px",
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
  numberField: {
    width: "2.8rem",
    margin: 5,
    marginLeft: 9,
  },
  link: {
    padding: 8,
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

  const onSettingsFontSizeChange = (e) => {
    const val = parseFloat(e.target.value);
    setSettings({ ...settings, fontSize: val });
  };

  const onSettingsFontFamilyChange = (e) => {
    setSettings({ ...settings, fontFamily: e.target.value });
  };

  const onSettingsShowOutputChange = (e) => {
    setSettings({ ...settings, showOutput: e.target.checked });
  };

  const onSettingsShowTextCountChange = (e) => {
    setSettings({ ...settings, showTextCount: e.target.checked });
  };

  const onSettingsKatexInlineChange = (e) => {
    setSettings({ ...settings, katexInline: e.target.checked });
  };

  const onSettingsKatexBlockChange = (e) => {
    setSettings({ ...settings, katexBlock: e.target.checked });
  };

  const onSettingsPrintRenderedChange = (e) => {
    setSettings({ ...settings, printRendered: e.target.value });
  };

  const onSettingsDlFormatChange = (e) => {
    setSettings({ ...settings, dlFormat: e.target.value });
  };

  const onSettingsCopyFormatChange = (e) => {
    setSettings({ ...settings, copyFormat: e.target.value });
  };

  // Save all settings changes to localstorage
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const fontsList = [
    ["Helvetica", "Helvetica, sans-serif"],
    ["Arial", "Arial, sans-serif"],
    ["Verdana", "Verdana, sans-serif"],
    ["Tahoma", "Tahoma, sans-serif"],
    ["Trebuchet MS", "'Trebuchet MS', sans-serif"],
    ["Times New Roman", "'Times New Roman', serif"],
    ["Georgia", "Georgia, serif"],
    ["Garamond", "Garamond, serif"],
    ["Courier New", "'Courier New', monospace"],
    ["Brush Script MT", "'Brush Script MT', cursive"],
  ];

  return (
    <>
      <Tooltip title="Settings" enterDelay={1000} leaveDelay={200}>
        <IconButton onClick={onSettingsButtonClick} className={classes.button}>
          <SettingsOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={settingsOpen} className={`hidePrint`}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Column>
            <FormControlLabel
              control={
                <TextField
                  type="number"
                  value={settings.fontSize}
                  onChange={onSettingsFontSizeChange}
                  className={classes.numberField}
                  inputProps={{ min: 1, max: 999 }}
                />
              }
              className={classes.formLabel}
              label="Font size"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Select
                  value={settings.fontFamily}
                  onChange={onSettingsFontFamilyChange}
                  className={classes.select}
                >
                  {fontsList.map((font) => {
                    return (
                      <MenuItem
                        value={font[1]}
                        key={font[0]}
                        style={{ fontFamily: font[1] }}
                      >
                        {font[0]}
                      </MenuItem>
                    );
                  })}
                </Select>
              }
              className={classes.formLabel}
              label="Font"
              labelPlacement="start"
            />
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
                <Checkbox
                  checked={settings.showTextCount}
                  onChange={onSettingsShowTextCountChange}
                  name="showTextCount"
                  color="primary"
                />
              }
              className={classes.formLabel}
              label="Show word and char count"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={settings.katexInline}
                  onChange={onSettingsKatexInlineChange}
                  name="katexInline"
                  color="primary"
                />
              }
              className={classes.formLabel}
              label="Inline KaTeX ($)"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={settings.katexBlock}
                  onChange={onSettingsKatexBlockChange}
                  name="katexBlock"
                  color="primary"
                />
              }
              className={classes.formLabel}
              label="Block KaTeX ($$)"
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
              label="Download format"
              labelPlacement="start"
            />
            <FormControlLabel
              control={
                <Select
                  value={settings.copyFormat}
                  onChange={onSettingsCopyFormatChange}
                  className={classes.select}
                >
                  <MenuItem value={"txt"}>Plain text</MenuItem>
                  <MenuItem value={"png"}>Image</MenuItem>
                  <MenuItem value={"html"}>HTML</MenuItem>
                </Select>
              }
              className={classes.formLabel}
              label="Copy to clipboard format"
              labelPlacement="start"
            />
          </Column>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Link href="/userguide.html" target="_blank" className={classes.link}>
            User Guide
          </Link>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Settings;
