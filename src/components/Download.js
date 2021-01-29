import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import { IconButton } from "@material-ui/core";
import { Column } from "simple-flexbox";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
}));

function Download({ writing }) {
  const classes = useStyles();

  const download = (filename, text) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const onDownloadButtonClick = () => {
    console.log("download pls");
    download("download.txt", writing);
  };

  return (
    <>
      <IconButton onClick={onDownloadButtonClick} className={classes.button}>
        <GetAppIcon />
      </IconButton>
    </>
  );
}

export default Download;
