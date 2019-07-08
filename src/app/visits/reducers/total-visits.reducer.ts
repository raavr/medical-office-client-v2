import * as VisitsActions from '../actions/visits.action';

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
  action: VisitsActions.VisitsActionUnion
) {
  switch(action.type) {
    case VisitsActions.VisitsActionTypes.GetVisits: 
    case VisitsActions.VisitsActionTypes.CancelVisit: {
      return {
        ...state,
        pending: true,
      }
    }

    case VisitsActions.VisitsActionTypes.GetVisitsSuccess: {
      return {
        pending: false,
        totalItems: action.payload.totalItems
      } 
    }

    case VisitsActions.VisitsActionTypes.CancelVisitSuccess: {
      return {
        totalItems: state.totalItems - 1,
        pending: false
      }
    }

    case VisitsActions.VisitsActionTypes.GetVisitsFailure: 
    case VisitsActions.VisitsActionTypes.ResetVisits: {
      return initialState;
    }
    
    default: {
      return state;
    }
  }
}

export const getTotalItems = (state: State) => state.totalItems;
export const getPending = (state: State) => state.pending;
