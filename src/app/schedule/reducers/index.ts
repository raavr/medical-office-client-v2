import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromVisitTimes from './visit-times.reducer';

export interface ScheduleState {
  times: fromVisitTimes.State;
}

export interface State extends fromRoot.State {
  schedule: ScheduleState;
}

export const reducers: ActionReducerMap<ScheduleState> = {
  times: fromVisitTimes.reducer,
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
