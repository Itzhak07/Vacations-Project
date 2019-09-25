import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteVacation } from "../../actions/vacations";
import { connect } from "react-redux";

const DeleteAlert = props => {
  const { vacation, text, deleteVacation } = props;
  const [open, setOpen] = React.useState(false);
  //   const id = props.VacationID;
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const deleteHandler = e => {
    console.log(vacation.VacationID);

    deleteVacation(vacation.VacationID);
    setOpen(false);
  };

  return (
    <Fragment>
      <Button color="secondary" onClick={handleClickOpen}>
        <DeleteIcon />
        <p>Delete</p>
      </Button>
      <Dialog
        className="deleteAlert"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete Vacation {vacation.VacationID} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={e => deleteHandler(e)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteAlert.propTypes = {
  // auth: PropTypes.object,
  // VacationID: PropTypes.func.isRequired
  deleteVacation: PropTypes.func.isRequired
  // user: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default connect(
  null,
  { deleteVacation }
)(DeleteAlert);

// export default DeleteAlert;
