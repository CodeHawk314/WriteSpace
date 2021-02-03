import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
import { IconButton, Tooltip } from "@material-ui/core";

import { getExported } from "./Export";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
}));

function Download({ writing, settings }) {
  const classes = useStyles();

  const copyToClipboard = async (blob) => {
    try {
      // eslint-disable-next-line no-undef
      const data = [new ClipboardItem({ [blob.type]: blob })];
      await navigator.clipboard.write(data);
    } catch (ReferenceError) {
      alert(
        "Sorry, copying images to the clipboard is not supported in your browser."
      );
    }
  };

  const download = (toDownload, ext) => {
    let element = document.createElement("a");
    element.download = "download." + ext;
    element.href =
      ext === "png"
        ? toDownload?.toDataURL()
        : "data:text/plain;charset=utf-8," + encodeURIComponent(toDownload);

    element.style.display = "none";
    element.click();
  };

  const onDownloadButtonClick = () => {
    getExported(settings.dlFormat, writing).then((r) => {
      console.log(typeof r);
      download(r, settings.dlFormat);
    });
  };

  return (
    <Tooltip title="Download" enterDelay={1000} leaveDelay={200}>
      <IconButton onClick={onDownloadButtonClick} className={classes.button}>
        <GetAppOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}

export default Download;
