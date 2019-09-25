import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  mainTitle: {
    fontFamily: "Pacifico,  cursive",
    textShadow: "2px 7px 5px #000000",
    fontSize: "120px",
    color: "white"
  }
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className={classes.mainTitle}>Observacation</h1>
          <div className="buttons">
            <Link to="/register">
              <div className="btn btn-primary">Sign Up</div>
            </Link>
            <Link to="/login">
              <div className="btn btn-light">Login</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
