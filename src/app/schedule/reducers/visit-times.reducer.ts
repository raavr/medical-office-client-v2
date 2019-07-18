import * as ScheduleActions from '../actions/schedule.action';

export interface State {
  pending: boolean,
  times: string[];
}

export const initialState: State = {
  pending: false,
  times: [],
}

export function reducer(
  state: State = initialState,
  action: ScheduleActions.ScheduleActionUnion
) {
  switch(action.type) {
    case ScheduleActions.ScheduleActionTypes.UpdateVisitTimes:
    case ScheduleActions.ScheduleActionTypes.GetFullSchedule: {
      return {
        ...state,
        pending: true,
      }
    }

    case ScheduleActions.ScheduleActionTypes.SetVisitTimes: {
      return {
        pending: false,
        times: action.payload
      } 
    }

    case ScheduleActions.ScheduleActionTypes.UpdateVisitTimesFailure: {
      return {
        ...state,
        pending: false
      }
    }

    case ScheduleActions.ScheduleActionTypes.ResetFullSchedule: {
      return initialState;
    }
    
    default: {
      return state;
    }
  }
}

export const getVisitTimes = (state: State) => state.times;
export const getPending = (state: State) => state.pending;
