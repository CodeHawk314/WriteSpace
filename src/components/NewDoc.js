import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import AddIcon from "@material-ui/icons/Add";
import { IconButton, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
}));

function NewDoc({ writing, setWriting }) {
  const classes = useStyles();

  const onNewDocButtonClick = () => {
    if (!writing) {
      // Already a fresh slate
      return;
    }

    const currentPadCreatedOn = parseInt(
      localStorage.getItem("currentPadCreatedOn")
    );
    let files = JSON.parse(localStorage.getItem("files") || "[]") || [];
    const currentFileIndex = files.findIndex(
      (elem) => elem.createdOn === currentPadCreatedOn
    );

    if (currentFileIndex !== -1) {
      if (writing !== files[currentFileIndex].data) {
        files.push({
          ...files.splice(currentFileIndex, 1)[0],
          data: writing,
        });
      }
    } else {
      files.push({
        data: writing,
        createdOn: currentPadCreatedOn || Date.now() - 100,
      });
    }

    localStorage.setItem("files", JSON.stringify(files));
    localStorage.setItem("currentPad", "");
    localStorage.setItem("currentPadCreatedOn", Date.now());
    setWriting("");

    ReactGA.event({
      category: "Files",
      action: "New doc",
    });
  };

  return (
    <Tooltip title="New" enterDelay={1000} leaveDelay={200}>
      <IconButton onClick={onNewDocButtonClick} className={classes.button}>
        <AddIcon />
      </IconButton>
    </Tooltip>
  );
}

export default NewDoc;
