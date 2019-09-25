import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import { getVacations } from "../../actions/vacations";
import { Bar } from "react-chartjs-2";
import Spinner from "../layouts/Spinner";

const Reports = ({
  auth: { user },
  getVacations,
  vacation: { vacations, loading }
}) => {
  const options = {
    labels: [""],
    datasets: [
      {
        label: [],
        data: [0],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  };

  useEffect(() => {
    getVacations();
  }, [getVacations]);

  const genRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (vacations.length !== 0) {
    vacations.map(vacation => {
      if (vacation.FollowsCount != 0) {
        options.labels.push(vacation.Destination);
        options.datasets[0].backgroundColor.push(genRandomColor());
        options.datasets[0].borderColor.push(genRandomColor());
        options.datasets[0].data.push(vacation.FollowsCount);
      }
    });
  }
  console.log(options.datasets[0].data);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className={` x-large text-primary`}>Vacations Report</h1>
      <Container fixed>
        <Bar
          data={{
            labels: options.labels,
            datasets: [
              {
                label: "Follows",

                data: options.datasets[0].data,
                backgroundColor: options.datasets[0].backgroundColor,
                borderColor: options.datasets[0].borderColor,
                borderWidth: 1
              }
            ]
          }}
          width={200}
          height={600}
          options={{ maintainAspectRatio: false }}
        />
      </Container>
    </Fragment>
  );
};

Reports.propTypes = {
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
)(Reports);
