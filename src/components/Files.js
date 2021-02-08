import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactGA from "react-ga";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SearchIcon from "@material-ui/icons/Search";
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
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "30rem",
    position: "relative",
    overflow: "auto",
    maxHeight: 401,
    padding: 0,
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
    width: "100%",
    height: "calc(5em - 1px)",
    paddingRight: 69,
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&$selected": {
      // backgroundColor: theme.palette.primary.light,
    },
  },
  listItemHeading: {
    fontWeight: 500,
    width: "100%",
  },
  listItemText: {
    width: "100%",
  },
  selected: {},
  button: {
    backgroundColor: theme.palette.common.lightestGray,
    margin: 3,
  },
  deleteButton: {
    color: theme.palette.common.red,
  },
  search: {
    width: "100%",
    marginBottom: "1rem",
  },
  searchIcon: {
    color: theme.palette.common.gray,
  },
  searchInput: {
    padding: 8,
  },
}));

function Files({ writing, setWriting }) {
  const classes = useStyles();
  const [filesDialogOpen, setFilesDialogOpen] = useState(false);
  const [deleteConfirmCreatedOn, setDeleteConfirmCreatedOn] = useState(null);
  const [currentPadCreatedOn, setCurrentPadCreatedOn] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);

  const onDialogClose = () => {
    setFilesDialogOpen(false);
  };

  const onFilesButtonClick = () => {
    const files = JSON.parse(localStorage.getItem("files") || "[]") || [];
    setFiles(files);
    setSearchTerm("");
    const currentPadCreatedOn = parseInt(
      localStorage.getItem("currentPadCreatedOn")
    );
    setCurrentPadCreatedOn(currentPadCreatedOn);
    saveCurrentfile(currentPadCreatedOn, files);
    setFilesDialogOpen(true);

    ReactGA.event({
      category: "Files",
      action: "Files dialog opened",
    });
  };

  const saveCurrentfile = (currentPadCreatedOn, files) => {
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
    localStorage.setItem("files", JSON.stringify(filesTemp));
    setFiles(filesTemp);
  };

  const onFileClick = (file) => {
    setFilesDialogOpen(false);

    setWriting(file.data);
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
          <Button onClick={deleteFile} className={classes.deleteButton}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderListItem = (file) => {
    // const regEx = /(?:#{0,6} )?(.+?(?:\n|$))\n*([\s\S]{0,100})[\s\S]*/g; // group 1: first line without heading hashes, group 2: all lines below
    const regEx = /(?:#{0,6} )?(.+?(?:\n|$))\n*(.*(?:\n|$))[\s\S]*/g; // group 1: first line without heading hashes, group 2: second line
    const lines = regEx.exec(file.data);

    return (
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
        <Typography noWrap className={classes.listItemHeading}>
          {lines ? lines[1] : ""}
        </Typography>
        <Typography noWrap className={classes.listItemText}>
          {lines
            ? searchTerm.length > 0
              ? lines[0].substr(
                  lines[0].toLowerCase().indexOf(searchTerm),
                  lines[0].length
                )
              : lines[2]
            : ""}
        </Typography>
        <ListItemSecondaryAction>
          <IconButton
            onClick={setDeleteConfirmCreatedOn.bind(this, file.createdOn)}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  const renderFileList = () => {
    let filteredFiles = files.filter((file) =>
      file?.data?.toLowerCase().includes(searchTerm)
    );
    return (
      <List className={classes.list}>
        {files?.length > 0 ? (
          filteredFiles?.length > 0 ? (
            filteredFiles
              .slice(0)
              .reverse()
              .map((file) => {
                return (
                  <React.Fragment key={file.createdOn}>
                    <Divider />
                    {renderListItem(file)}
                  </React.Fragment>
                );
              })
          ) : (
            <p>No results</p>
          )
        ) : (
          <p>You don't have any other saved files</p>
        )}
        <Divider />
      </List>
    );
  };

  const renderSearchBar = () => {
    return (
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        className={classes.search}
        variant="outlined"
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.searchIcon}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        inputProps={{
          className: classes.searchInput,
        }}
      />
    );
  };

  return (
    <>
      <Dialog open={filesDialogOpen}>
        <DialogTitle>Files</DialogTitle>
        <DialogContent>
          {files?.length > 0 && renderSearchBar()}
          {renderFileList()}
        </DialogContent>
        <DialogActions>
          <Button onClick={onDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {renderDeleteConfirm()}
      <Tooltip title="Files" enterDelay={1000} leaveDelay={200}>
        <IconButton onClick={onFilesButtonClick} className={classes.button}>
          <FolderOutlinedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default Files;
