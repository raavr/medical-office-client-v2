import * as PatientsFilterActions from '../actions/patients-filter.action';

export interface State {
  currentPage: number;
  limit: number;
  name: string;
  email: string;
}

export const initialState: State = {
  currentPage: 1,
  limit: 10,
  name: '',
  email: ''
};

export function reducer(
  state: State = { ...initialState },
  action: PatientsFilterActions.PatientsFilterActionUnion
) {
  switch (action.type) {
    case PatientsFilterActions.PatientsFilterActionTypes.SetFilter: {
      return {
        ...state,
        ...action.payload
      };
    }
    case PatientsFilterActions.PatientsFilterActionTypes.ResetFilter: {
      const limit = state.limit;
      return {
        ...initialState,
        limit
      };
    }

    default: {
      return state;
    }
  }
}

export const getPatientsFilter = (state: State) => state;
