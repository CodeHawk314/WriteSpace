import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import CloseIcon from "@material-ui/icons/Close";
import { Snackbar, IconButton, Tooltip } from "@material-ui/core";

import { getExported } from "./Export";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
  snackbarSuccess: {
    backgroundColor: theme.palette.common.green,
  },
  snackbarError: {
    backgroundColor: theme.palette.common.red,
  },
}));

function Copy({ writing, settings }) {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState({
    open: false,
    success: true,
    msg: "",
  });

  const copyToClipboard = async (toCopy, format) => {
    switch (format) {
      case "png":
        toCopy.toBlob(async (blob) => {
          try {
            // eslint-disable-next-line no-undef
            const data = [new ClipboardItem({ [blob.type]: blob })];
            await navigator.clipboard.write(data);
            setSnackbar({
              open: true,
              success: true,
              msg: "Copied output picture to the clipboard!",
            });
          } catch (e) {
            setSnackbar({
              open: true,
              success: false,
              msg:
                "Sorry, copying images to the clipboard is not supported in your browser.",
            });
            console.error(e);
            return;
          }
        });
        break;
      default:
        try {
          await navigator.clipboard.writeText(toCopy);
        } catch (e) {
          setSnackbar({
            open: true,
            success: false,
            msg:
              "Sorry, copying to the clipboard is not supported in your browser.",
          });
          console.error(e);
          return;
        }
        let msg;
        switch (format) {
          case "txt":
            msg = "Copied text to the clipboard!";
            break;
          case "html":
            msg = "Copied output html to the clipboard!";
            break;
          default:
            msg = "Copied to the clipboard!";
        }
        setSnackbar({ open: true, success: true, msg: msg });
    }
  };

  const onCopyButtonClick = () => {
    getExported(settings.copyFormat, writing, settings).then((toCopy) => {
      copyToClipboard(toCopy, settings.copyFormat);
    });
    ReactGA.event({
      category: "Export",
      action: "Copy",
      label: settings.copyFormat,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Tooltip title="Copy" enterDelay={1000} leaveDelay={200}>
        <IconButton onClick={onCopyButtonClick} className={classes.button}>
          <FileCopyOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        message={snackbar.msg}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        ContentProps={{
          classes: {
            root: snackbar.success
              ? classes.snackbarSuccess
              : classes.snackbarError,
          },
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </>
  );
}

export default Copy;
