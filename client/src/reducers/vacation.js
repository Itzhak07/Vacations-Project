import {
  GET_VACATIONS,
  VACATION_ERROR,
  UPDATE_FOLLOWS,
  DELETE_VACATION,
  ADD_VACATION,
  UPDATE_VACATION
} from "../actions/types";

const intialState = {
  vacations: [],
  vacation: null,
  loading: true,
  error: {}
};

export default function(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VACATIONS:
      return {
        ...state,
        vacations: payload,
        loading: false
      };
    case ADD_VACATION:
      return {
        ...state,
        vacations: [...state.vacations, payload],
        loading: false
      };
    case UPDATE_VACATION:
      return {
        ...state,
        vacations: payload,
        loading: false
      };
    case DELETE_VACATION:
      return {
        ...state,
        vacations: state.vacations.filter(
          vacation => vacation.VacationID !== payload
        ),
        loading: false
      };
    case VACATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_FOLLOWS:
      return {
        ...state,
        vacations: state.vacations.map(vacation =>
          vacation.VacationID === payload.vacationId
            ? { ...vacation, follows: payload.follows }
            : vacation
        ),
        loading: false
      };

    default:
      return state;
  }
}
