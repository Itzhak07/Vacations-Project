import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addVacation, updateVacation } from "../../actions/vacations";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const VacationForm = props => {
  console.log(props);

  const classes = useStyles();
  const [formData, setFormData] = useState({
    id: props.vacation.VacationID,
    destination: props.vacation.Destination,
    description: props.vacation.Description,
    fromDate: props.vacation.From,
    toDate: props.vacation.To,
    price: props.vacation.Price,
    file: null
  });

  console.log("kaki" + JSON.stringify(formData));

  const [filename, setFileName] = useState("Please Upload Image");
  const today = new Date();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const imageHandler = e => {
    setFormData({ ...formData, file: e.target.files[0] });
    setFileName(e.target.files[0].name);
  };

  const prepareFormData = () => {
    const fileData = new FormData();

    for (const key in formData) {
      fileData.append(key, formData[key]);
    }

    return fileData;
  };

  const onSubmit = e => {
    e.preventDefault();
    const data = prepareFormData();
    for (let pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (props.formType === "Add") {
      props.addVacation(data);
      console.log({ formData });
    }
    if (props.formType === "Edit") {
      props.updateVacation(data);
      console.log({ formData });
    }
  };

  const addForm = (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <AddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add Vacation
      </Typography>
      <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              type="text"
              autoComplete="destination"
              name="destination"
              variant="outlined"
              required
              fullWidth
              label="Destination"
              autoFocus
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="text"
              label="Description"
              name="description"
              fullWidth
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              variant="outlined"
              required
              fullWidth
              defaultValue={today}
              label="From"
              name="fromDate"
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              variant="outlined"
              required
              fullWidth
              defaultValue={today}
              label="To"
              name="toDate"
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="number"
              variant="outlined"
              required
              fullWidth
              label="Price"
              name="price"
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="file"
              variant="outlined"
              required
              fullWidth
              // defaultValue="kaki"
              label="Image"
              name="file"
              onChange={e => imageHandler(e)}
            />
            <p>{filename}</p>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );

  const editForm = (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <CreateIcon />
      </Avatar>

      <Typography component="h1" variant="h5">
        Edit Vacation
      </Typography>
      <form className={classes.form} onSubmit={e => onSubmit(e)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              type="text"
              autoComplete="destination"
              name="destination"
              variant="outlined"
              required
              fullWidth
              defaultValue={props.vacation.Destination}
              label="Destination"
              autoFocus
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="text"
              label="Description"
              name="description"
              fullWidth
              defaultValue={props.vacation.Description}
              multiline
              rows="4"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              variant="outlined"
              fullWidth
              defaultValue={props.vacation.From}
              label="From"
              name="fromDate"
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              variant="outlined"
              fullWidth
              defaultValue={props.vacation.To}
              label="To"
              name="toDate"
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="number"
              variant="outlined"
              required
              fullWidth
              defaultValue={props.vacation.Price}
              label="Price"
              name="price"
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              type="file"
              variant="outlined"
              fullWidth
              label="Image"
              name="file"
              onChange={e => imageHandler(e)}
            />
            <p>{props.vacation.ImageName}</p>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
    </div>
  );

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      {props.formType === "Edit" ? editForm : addForm}
    </Container>
  );
};

VacationForm.propTypes = {
  addVacation: PropTypes.func.isRequired,
  updateVacation: PropTypes.func.isRequired
};

export default connect(
  null,
  { addVacation, updateVacation }
)(VacationForm);
