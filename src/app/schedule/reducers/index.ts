import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromVisitTimes from './visit-times.reducer';
import * as fromDisabledDates from './disabled-dates.reducer';
import * as fromWeeklyTimes from './weekly-visit-times.reducer';

export interface ScheduleState {
  times: fromVisitTimes.State;
  disabledDates: fromDisabledDates.State;
  weeklyVisitTimes: fromWeeklyTimes.State;
}

export interface State extends fromRoot.State {
  schedule: ScheduleState;
}

export const reducers: ActionReducerMap<ScheduleState> = {
  times: fromVisitTimes.reducer,
  disabledDates: fromDisabledDates.reducer,
  weeklyVisitTimes: fromWeeklyTimes.reducer
};

export const selectScheduleState = createFeatureSelector<State, ScheduleState>('schedule');

export const selectVisitTimesState = createSelector(
  selectScheduleState,
  (state: ScheduleState) => state.times
);

export const getVisitTimes = createSelector(
  selectVisitTimesState,
  fromVisitTimes.getVisitTimes
);

export const getPendingVisitTimes = createSelector(
  selectVisitTimesState,
  fromVisitTimes.getPending
);

export const selectDisabledDatesState = createSelector(
  selectScheduleState,
  (state: ScheduleState) => state.disabledDates
);

export const getDisabledDates = createSelector(
  selectDisabledDatesState,
  fromDisabledDates.getDisabledDates
);

export const getPendingDisabledDates = createSelector(
  selectDisabledDatesState,
  fromDisabledDates.getPending
);

export const selectWeeklyVisitTimesState = createSelector(
  selectScheduleState,
  (state: ScheduleState) => state.weeklyVisitTimes
);

export const getWeeklyVisitTimes = createSelector(
  selectWeeklyVisitTimesState,
  fromWeeklyTimes.getWeeklyVisitTimes
);

export const getPendingWeeklyVisitTimes = createSelector(
  selectWeeklyVisitTimesState,
  fromWeeklyTimes.getPending
);
