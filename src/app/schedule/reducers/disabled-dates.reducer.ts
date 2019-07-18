import * as ScheduleActions from '../actions/schedule.action';

export interface State {
  pending: boolean,
  disabledDates: string[];
}

export const initialState: State = {
  pending: false,
  disabledDates: [],
}

export function reducer(
  state: State = initialState,
  action: ScheduleActions.ScheduleActionUnion
) {
  switch(action.type) {
    case ScheduleActions.ScheduleActionTypes.UpdateDisabledDates:
    case ScheduleActions.ScheduleActionTypes.GetFullSchedule: {
      return {
        ...state,
        pending: true,
      }
    }

    case ScheduleActions.ScheduleActionTypes.SetDisabledDates: {
      return {
        pending: false,
        disabledDates: action.payload
      } 
    }

    case ScheduleActions.ScheduleActionTypes.UpdateDisabledDatesFailure: {
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

export const getDisabledDates = (state: State) => state.disabledDates;
export const getPending = (state: State) => state.pending;
