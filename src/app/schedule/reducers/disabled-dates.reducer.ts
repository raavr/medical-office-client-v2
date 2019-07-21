import * as ScheduleActions from '../actions/schedule.action';

export interface State {
  pending: boolean;
  disabledDates: string[];
}

export const initialState: State = {
  pending: false,
  disabledDates: []
};

export function reducer(
  state: State = initialState,
  action: ScheduleActions.ScheduleActionUnion
) {
  switch (action.type) {
    case ScheduleActions.ScheduleActionTypes.UpdateDisabledDates: {
      return {
        ...state,
        pending: true
      };
    }

    case ScheduleActions.ScheduleActionTypes.GetFullSchedule: {
      return {
        ...state,
        /****
         * The GetFullSchedule action is dispatch in two cases:
         * - when the schedule.component is initialized => in that case we want to set the pending property to true 
         *   for all reducers (disabled-dates.reducer, visit-times.reducer and the weekly-visit.reducer). In other words, 
         *   we want to display loading screens for all components depending on that reducers.
         * - when the times object from the schedule store is updated => in that case we have to update only the times object
         *   and the weeklyVisitTimes object because it depends on the times object. For these two objects we have to set their 
         *   pending property to true bacause we want to display loading screens. 
         *   Our disabledDates object didn't change in that scenario so the pending property should still equal false, 
         *   it means displaying a loading screen is not necessary. 
         * */
        pending: action.disableDatesPending
      };
    }

    case ScheduleActions.ScheduleActionTypes.SetDisabledDates: {
      return {
        pending: false,
        disabledDates: action.payload
      };
    }

    case ScheduleActions.ScheduleActionTypes.UpdateDisabledDatesFailure: {
      return {
        ...state,
        pending: false
      };
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
