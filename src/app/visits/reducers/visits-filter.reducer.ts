import * as VisitsFilterActions from '../actions/visits-filter.action';
import { VisitStatus, VisitType } from '../models/visit';

export interface State {
  currentPage: number;
  date: string;
  time: string;
  limit: number;
  status: VisitStatus;
  type: VisitType;
  userName: string;
}

export const initialState: State = {
  currentPage: 1,
  date: '',
  time: '',
  limit: 10,
  status: VisitStatus.ALL,
  type: VisitType.CURRENT,
  userName: ''
}

export function reducer(
  state: State = { ...initialState },
  action: VisitsFilterActions.VisitsFilterActionUnion
) {
  switch(action.type) {
    case VisitsFilterActions.VisitsFilterActionTypes.SetFilter: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case VisitsFilterActions.VisitsFilterActionTypes.ResetFilter: {
      const limit = state.limit;
      return {
        ...initialState,
        limit
      }
      
    }

    default: {
      return state;
    }
  }
}

export const getVisitsFilter = (state: State) => state;
export const getVisitsFilterType = (state: State) => state.type;
