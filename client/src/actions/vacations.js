import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_VACATIONS,
  VACATION_ERROR,
  UPDATE_FOLLOWS,
  DELETE_VACATION,
  ADD_VACATION,
  UPDATE_VACATION
} from "./types";

//Get Vacations
export const getVacations = () => async dispatch => {
  try {
    const res = await axios.get("/api/vacations");

    dispatch({
      type: GET_VACATIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add Vacation
export const addVacation = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  try {
    const res = await axios.post("/api/vacations/", formData, config);

    dispatch({
      type: ADD_VACATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: "kaki" }
    });
  }
};

// err, status: err.response.status

//Update Vacation
export const updateVacation = formData => async dispatch => {
  const id = formData.get("id");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  try {
    const res = await axios.put(
      `/api/vacations/update/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_VACATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err, status: err.response.status }
    });
  }
};

//Delete Vacation
export const deleteVacation = vacationId => async dispatch => {
  try {
    const res = await axios({
      method: "delete",
      url: `/api/vacations/delete/${vacationId}`,
      headers: {
        "Content-Type": "application/json"
      }
    });

    dispatch({
      type: DELETE_VACATION,
      payload: vacationId
    });

    dispatch(setAlert("Vacation Deleted", "success"));
  } catch (err) {}
};

//Add Follow
export const addFollow = (vacationId, userId) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ vacationId, userId });

  try {
    const res = await axios.post("/api/follows", body, config);

    dispatch({
      type: UPDATE_FOLLOWS,
      payload: { vacationId }
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Remove Follow
export const removeFollow = (vacationId, userId) => async dispatch => {
  try {
    // const res = await axios.delete("/api/follows", body, config);
    const res = await axios({
      method: "delete",
      url: "/api/follows",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        vacationId: vacationId,
        userId: userId
      }
    });

    dispatch({
      type: UPDATE_FOLLOWS,
      payload: { vacationId }
    });
  } catch (err) {
    dispatch({
      type: VACATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
