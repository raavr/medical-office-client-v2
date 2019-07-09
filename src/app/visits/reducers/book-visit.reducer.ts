import * as BookVisitActions from '../actions/book-visit.action';
import { VisitTime } from '../models/visit-booking';
import { User } from 'src/app/auth/models/user';

export interface State {
  disabledDates: string[];
  availableTimes: VisitTime[];
  patientsByName: User[];
  doctors: User[];
  pending: boolean;
}

export const initialState: State = {
  disabledDates: [],
  availableTimes: [],
  patientsByName: [],
  doctors: [],
  pending: false,
};

export function reducer(
  state: State = initialState,
  action: BookVisitActions.BookVisitActionUnion
): State {
  switch (action.type) {
    case BookVisitActions.BookVisitActionTypes.GetUnavailableDatesSuccess:
      return {
        ...state,
        disabledDates: action.payload.disabledDates,
      };

    case BookVisitActions.BookVisitActionTypes.GetUnavailableDatesFailure:
      return {
        ...state,
        disabledDates: []
      };

    case BookVisitActions.BookVisitActionTypes.GetAvailableTimeSuccess:
      return {
        ...state,
        availableTimes: action.payload,
      };

    case BookVisitActions.BookVisitActionTypes.GetAvailableTimeFailure:
      return {
        ...state,
        availableTimes: []
      };

    case BookVisitActions.BookVisitActionTypes.GetPatientsByNameSuccess:
      return {
        ...state,
        patientsByName: action.payload,
      };

    case BookVisitActions.BookVisitActionTypes.GetPatientsByNameFailure:
      return {
        ...state,
        patientsByName: []
      };

    case BookVisitActions.BookVisitActionTypes.GetDoctorsSuccess:
      return {
        ...state,
        doctors: action.payload,
      };

    case BookVisitActions.BookVisitActionTypes.GetDoctorsFailure:
      return {
        ...state,
        doctors: []
      };

    case BookVisitActions.BookVisitActionTypes.BookVisit: {
      return {
        ...state,
        pending: true
      }
    }

    case BookVisitActions.BookVisitActionTypes.BookVisitSuccess: 
    case BookVisitActions.BookVisitActionTypes.BookVisitFailure: {
      return {
        ...state,
        pending: false
      }
    }

    default:
      return state;
  }
}

export const getDisabledDates = (state: State) => state.disabledDates;
export const getAvailableTimes = (state: State) => state.availableTimes;
export const getPatientsByName = (state: State) => state.patientsByName;
export const getDoctors = (state: State) => state.doctors;
export const getBookVisitPending = (state: State) => state.pending;
