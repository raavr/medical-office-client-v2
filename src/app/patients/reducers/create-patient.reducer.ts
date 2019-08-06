import * as CreatePatientActions from '../actions/create-patient.action';

export interface State {
  pending: boolean;
}

export const initialState: State = {
  pending: false,
};

export function reducer(
  state: State = initialState,
  action: CreatePatientActions.CreatePatientActionUnion
): State {
  switch (action.type) {
    case CreatePatientActions.CreatePatientActionTypes.CreatePatient: {
      return {
        pending: true
      }
    }

    case CreatePatientActions.CreatePatientActionTypes.CreatePatientSuccess: 
    case CreatePatientActions.CreatePatientActionTypes.CreatePatientFailure: {
      return {
        ...initialState
      }
    }

    default:
      return state;
  }
}

export const getPending = (state: State) => state.pending;
