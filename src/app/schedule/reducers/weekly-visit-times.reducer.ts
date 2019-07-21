import * as ScheduleActions from '../actions/schedule.action';
import { VisitTimeOfDay } from '../models/visit-datetime.interface';

export interface State {
  pending: boolean,
  weeklyVisitTimes: VisitTimeOfDay[];
}

export const initialState: State = {
  pending: false,
  weeklyVisitTimes: [],
}

export function reducer(
  state: State = initialState,
  action: ScheduleActions.ScheduleActionUnion
) {
  switch(action.type) {
    case ScheduleActions.ScheduleActionTypes.UpdateWeeklyVisitTimes:
    case ScheduleActions.ScheduleActionTypes.GetFullSchedule: {
      return {
        ...state,
        pending: true,
      }
    }

    case ScheduleActions.ScheduleActionTypes.SetWeeklyVisitTimes: {
      return {
        pending: false,
        weeklyVisitTimes: action.payload
      } 
    }

    case ScheduleActions.ScheduleActionTypes.UpdateWeeklyVisitTimesFailure: {
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

export const getWeeklyVisitTimes = (state: State) => state.weeklyVisitTimes;
export const getPending = (state: State) => state.pending;
