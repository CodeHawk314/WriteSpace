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
    if (settings.dlFormat === "pdf") {
      window.print();
      return;
    }
    getExported(settings.dlFormat, writing, settings).then((r) => {
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
