import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemSecondaryAction,
  Divider,
  Button,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "30em",
    position: "relative",
    overflow: "auto",
    maxHeight: 400,
    padding: 0,
  },
  listItem: {
    width: "100%",
    height: "5em",
    "&$selected": {
      // backgroundColor: theme.palette.primary.light,
    },
  },
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
  selected: {},
}));

function Files({ writing, setWriting }) {
  const classes = useStyles();
  const [filesDialogOpen, setFilesDialogOpen] = useState(false);
  const [deleteConfirmCreatedOn, setDeleteConfirmCreatedOn] = useState(null);
  const [currentPadCreatedOn, setCurrentPadCreatedOn] = useState();
  const [files, setFiles] = useState([]);

  const onDialogClose = () => {
    setFilesDialogOpen(false);
  };

  const onFilesButtonClick = () => {
    setFiles(JSON.parse(localStorage.getItem("files") || "[]") || []);
    setCurrentPadCreatedOn(
      parseInt(localStorage.getItem("currentPadCreatedOn"))
    );
    setFilesDialogOpen(true);
  };

  const onFileClick = (file) => {
    setFilesDialogOpen(false);

    let filesTemp = files;

    const currentFileIndex = filesTemp.findIndex(
      (elem) => elem.createdOn === currentPadCreatedOn
    );

    if (writing) {
      if (currentFileIndex !== -1) {
        if (writing !== filesTemp[currentFileIndex].data) {
          filesTemp.push({
            ...filesTemp.splice(currentFileIndex, 1)[0],
            data: writing,
          });
        }
      } else {
        filesTemp.push({
          data: writing,
          createdOn: currentPadCreatedOn || Date.now() - 100,
        });
      }
    }

    setWriting(file.data);
    localStorage.setItem("files", JSON.stringify(filesTemp));
    localStorage.setItem("currentPadCreatedOn", file.createdOn);
    localStorage.setItem("currentPad", file.data);
  };

  const deleteFile = () => {
    const createdOn = deleteConfirmCreatedOn;
    setDeleteConfirmCreatedOn(null);

    let filesTemp = files;
    const toDelIndex = filesTemp.findIndex(
      (elem) => elem.createdOn === createdOn
    );

    filesTemp.splice(toDelIndex, 1);
    localStorage.setItem("files", JSON.stringify(filesTemp));

    setFiles([...filesTemp]);

    if (createdOn === currentPadCreatedOn) {
      localStorage.setItem("files", JSON.stringify(files));
      localStorage.setItem("currentPad", "");
      localStorage.setItem("currentPadCreatedOn", Date.now());
      setWriting("");
    }
  };

  const renderDeleteConfirm = () => {
    return (
      <Dialog open={deleteConfirmCreatedOn != null}>
        <DialogTitle>Delete File?</DialogTitle>
        <DialogContent>
          <p>This action cannot be undone</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={setDeleteConfirmCreatedOn.bind(this, null)}>
            Cancel
          </Button>
          <Button onClick={deleteFile}>Delete</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderFileList = () => {
    return (
      <List className={classes.list}>
        {files !== undefined && files.length > 0 ? (
          files
            .slice(0)
            .reverse()
            .map((file) => {
              return (
                <React.Fragment key={file.createdOn}>
                  <Divider />
                  <ListItem
                    button
                    key={file.createdOn}
                    onClick={onFileClick.bind(this, file)}
                    className={classes.listItem}
                    classes={{
                      selected: classes.selected,
                    }}
                    selected={file.createdOn === currentPadCreatedOn}
                  >
                    {file.data}
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={setDeleteConfirmCreatedOn.bind(
                          this,
                          file.createdOn
                        )}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              );
            })
        ) : (
          <p>You don't have any other saved files</p>
        )}
        <Divider />
      </List>
    );
  };

  return (
    <>
      <Dialog open={filesDialogOpen}>
        <DialogTitle>Files</DialogTitle>
        <DialogContent>{renderFileList()}</DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {renderDeleteConfirm()}
      <IconButton onClick={onFilesButtonClick} className={classes.button}>
        <FolderOutlinedIcon />
      </IconButton>
    </>
  );
}

export default Files;
