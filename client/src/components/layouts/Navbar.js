import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ToysIcon from "@material-ui/icons/Toys";
import InputIcon from "@material-ui/icons/Input";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/vacations">Vacations</Link>
      </li>
      {user != null && user.Role == "Admin" ? (
        <li>
          {" "}
          <Link to="/reports">Reports</Link>
        </li>
      ) : (
        ""
      )}
      <li className="auth sort-last">
        <a onClick={logout} href="#!">
          Logout
        </a>
      </li>
      <li className="auth sort-third">
        {user != null ? "Hello " + user.FirstName + " " + user.LastName : ""}{" "}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li className="auth">
        <Link to="/register">Register</Link>
      </li>
      <li className="auth">
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const style = {
    navTitle: {
      fontFamily: "Pacifico,  cursive"
    }
  };

  const authTitle = (
    <div className="navLogo">
      <ToysIcon fontSize="large" />
      <h1 style={style.navTitle}>
        <Link to="/vacations">ObserVacation</Link>
      </h1>
    </div>
  );
  const guestTitle = (
    <h1 style={style.navTitle}>
      <Link to="/">
        <ToysIcon fontSize="large" />
        ObserVacation
      </Link>
    </h1>
  );
  // console.log(user.Role);
  return (
    <nav className="navbar bg-nav">
      {!loading && (
        <Fragment>{isAuthenticated ? authTitle : guestTitle}</Fragment>
      )}

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
