import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  body: {
    backgroundColor: "black"
  }
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <CircularProgress className={[classes.progress, "spinner"]} />
    </div>
  );
}
