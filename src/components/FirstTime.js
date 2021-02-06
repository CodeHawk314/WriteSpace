import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Link } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: 95,
    right: 36,
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.common.lightestGray,
    fontFamily: "Roboto",
    fontSize: "11pt",
    [theme.breakpoints.down("xs")]: {
      top: 90,
      padding: "4px 10px",
      fontSize: "10pt",
    },
  },
  close: {
    padding: 3,
    marginRight: 5,
  },
  closeIcon: {
    fontSize: 13,
  },
}));

function FirstTime() {
  const classes = useStyles();
  const [firstTime, setFirstTime] = useState();

  const close = () => {
    setFirstTime(false);
    localStorage.setItem("notFirstTime", 1);
  };

  useEffect(() => {
    setFirstTime(!localStorage.getItem("notFirstTime"));
    setTimeout(() => {
      setFirstTime(false);
      localStorage.setItem("notFirstTime", 1);
    }, 30000);
  }, []);

  return (
    <>
      {firstTime && (
        <div className={`${classes.container} hidePrint`}>
          <IconButton className={classes.close} onClick={close}>
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
          First time? View the{" "}
          <Link href={"/userguide"} target="_blank">
            user guide
          </Link>
          .
        </div>
      )}
    </>
  );
}

export default FirstTime;
