import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `linear-gradient(to bottom,  #00000080, #2a202980, #423e5680, #43648840, #248fb140, #29a7c040, #3bbecb40, #56d6d440, #75e0dd40, #8fe9e640, #a8f3f040, #bffcf940), 
      url(https://source.unsplash.com/1600x900/?traveling)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%"
  },
  title: {
    fontSize: "5rem",
    color: "white",
    fontFamily: "Pacifico,  cursive",
    textShadow: "2px 7px 5px #000000",
    fontWeight: "300",
    lineHeight: "1",
    letterSpacing: " -0.01562em",
    marginTop: "20%",
    left: "20%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00ae00",
    width: "80px",
    height: "80px"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [formData, setFromData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;
  const onChange = e =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({ username, password });
  };
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/vacations" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={12} xs={12} md={7} className={classes.image}>
        <Typography
          className={classes.title}
          component="h1"
          variant="h1"
          align="center"
        >
          <Grid item xs={false} sm={12}>
            ObserVacation
          </Grid>
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={e => onChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={e => onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Typography variant="h5">
                  Dont have an account? <Link to="/register">Sign Up</Link>
                </Typography>
              </Grid>
            </Grid>
            <Box mt={5} />
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
