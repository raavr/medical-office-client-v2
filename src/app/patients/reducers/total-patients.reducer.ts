import * as PatientsActions from '../actions/patients.action';

export interface State {
  pending: boolean,
  totalItems: number;
}

export const initialState: State = {
  pending: false,
  totalItems: 0,
}

export function reducer(
  state: State = initialState,
  action: PatientsActions.PatientsActionUnion
) {
  switch(action.type) {
    case PatientsActions.PatientsActionTypes.GetPatients:
    case PatientsActions.PatientsActionTypes.RemovePatient: {
      return {
        ...state,
        pending: true,
      }
    }

    case PatientsActions.PatientsActionTypes.GetPatientsSuccess: {
      return {
        pending: false,
        totalItems: action.payload.totalItems
      } 
    }

    case PatientsActions.PatientsActionTypes.RemovePatientSuccess: {
      return {
        totalItems: state.totalItems - 1,
        pending: false
      }
    }

    case PatientsActions.PatientsActionTypes.GetPatientsFailure: 
    case PatientsActions.PatientsActionTypes.ResetPatients: {
      return initialState;
    }

    case PatientsActions.PatientsActionTypes.RemovePatientFailure: {
      return {
        ...state,
        pending: false,
      }
    }
    
    default: {
      return state;
    }
  }
}

export const getTotalItems = (state: State) => state.totalItems;
export const getPending = (state: State) => state.pending;
