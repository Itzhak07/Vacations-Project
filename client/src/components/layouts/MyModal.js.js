/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "block",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "450px",
    margin: "0 auto"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  addIcon: {
    color: "white"
  }
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function MyModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editBtn = (
    <Button onClick={handleOpen}>
      <CreateIcon />
      <p>Edit</p>
    </Button>
  );
  const addBtn = (
    <IconButton className="addBtn btn-hover-shine" onClick={handleOpen}>
      <AddIcon className={classes.addIcon} />
    </IconButton>
  );

  return (
    <Fragment>
      {props.add ? addBtn : editBtn}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade onSubmit={handleClose} in={open}>
          {props.children}
        </Fade>
      </Modal>
    </Fragment>
  );
}
