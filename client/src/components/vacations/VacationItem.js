import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import VacationForm from "./VacationForm";
import MyModal from "../layouts/MyModal.js";
import { connect } from "react-redux";
import Moment from "react-moment";
import {
  addFollow,
  removeFollow,
  deleteVacation
} from "../../actions/vacations";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteAlert from "../layouts/DeleteAlert";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    maxHeight: 850
    // width: 8000
  },
  media: {
    height: 0,
    width: "100%",
    paddingTop: "56.25%" // 16:9
  },
  icon: {
    margin: theme.spacing(4)
  },
  cardTitle: {
    height: 120
  },
  btnactions: {
    textAlign: "center",
    backgroundColor: "#acacac2e",
    borderRadius: "10px",
    margin: "0 -20px 0 -9px",
    width: "105%"
  },
  authbtns: {
    padding: "unset !important"
  }
}));

const VacationItem = ({
  user,
  addFollow,
  removeFollow,
  deleteVacation,
  vacation,
  vacation: {
    VacationID,
    Destination,
    Description,
    From,
    To,
    Follows,
    Price,
    ImageName,
    FollowsCount
  }
}) => {
  const classes = useStyles();
  const [follow, setfollow] = useState();
  const [numOfFollows, setNum] = useState(FollowsCount);

  useEffect(() => {
    if (user !== null) {
      console.log(user);

      Follows.map(follow => {
        if (follow.UserID == user.UserID) {
          setfollow(true);
        }
      });
    }
  }, [user]);

  const followHandler = () => {
    if (follow) {
      removeFollow(VacationID, user.UserID);
      setfollow(false);
      console.log("Unfollowed " + numOfFollows);
      setNum(numOfFollows - 1);
    }
    if (!follow) {
      addFollow(VacationID, user.UserID);
      setfollow(true);
      console.log("Followed " + numOfFollows);
      setNum(numOfFollows + 1);
    }
  };

  const userBtns = (
    <IconButton
      color={!follow ? "default" : "secondary"}
      onClick={followHandler}
    >
      <FavoriteIcon className={classes.icon} />
      <p>{numOfFollows}</p>
    </IconButton>
  );

  const adminBtns = (
    <Fragment>
      <Grid className={classes.btnactions} container>
        <Grid item xs={6}>
          <DeleteAlert vacation={vacation} />
        </Grid>
        <Grid item xs={6}>
          <MyModal className="authBtn" title="Edit">
            <VacationForm formType="Edit" vacation={vacation} />
          </MyModal>
        </Grid>
      </Grid>
    </Fragment>
  );

  return (
    <Card className={classes.card}>
      <CardHeader title={Destination} />
      <CardMedia
        className={classes.media}
        image={`./uploads/` + ImageName}
        title={Destination}
      />
      <CardContent>
        <Typography variant="body1" className={classes.cardTitle}>
          <p>{Description}</p>
        </Typography>

        <Typography paragraph>
          <p>
            From: <Moment format="DD/MM/YYYY">{From}</Moment>
          </p>
        </Typography>
        <Typography paragraph>
          <p>
            {" "}
            To: <Moment format="DD/MM/YYYY">{To}</Moment>
          </p>
        </Typography>
        <Typography paragraph>
          <p> Price: {Price}$ </p>
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {user !== null && user.Role == "Admin" ? adminBtns : userBtns}
      </CardActions>
    </Card>
  );
};

VacationItem.propTypes = {
  auth: PropTypes.object,
  vacation: PropTypes.object.isRequired,
  addFollow: PropTypes.func.isRequired,
  removeFollow: PropTypes.func.isRequired,
  deleteVacation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addFollow, removeFollow, deleteVacation }
)(VacationItem);
