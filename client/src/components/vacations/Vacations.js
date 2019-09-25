import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import { getVacations } from "../../actions/vacations";
import VacationItem from "../vacations/VacationItem";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import VacationForm from "./VacationForm";
import MyModal from "../layouts/MyModal.js";

const Vacations = ({
  auth: { user },
  getVacations,
  vacation,
  vacation: { vacations, loading }
}) => {
  useEffect(() => {
    getVacations();
  }, [getVacations]);

  const addVacationBtn = (
    <MyModal add="true" title="Add Vacation">
      <VacationForm vacation={vacation} formType="Add" />
    </MyModal>
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {user !== null && user.Role === "Admin" ? addVacationBtn : ""}
      <h1 className={` x-large text-primary`}>Vacations</h1>
      <p className="lead">Welcome to your next vacation</p>

      <Container>
        <br />
        <Grid container spacing={4}>
          {vacations.map(vacation => (
            <Grid item xs={12} sm={6} lg={4}>
              <VacationItem
                key={vacation.VacationID}
                vacation={vacation}
                user={user}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Fragment>
  );
};

Vacations.propTypes = {
  getVacations: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  vacation: state.vacation,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getVacations }
)(Vacations);
