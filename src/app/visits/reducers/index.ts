import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromVisits from './visits.reducer';
import * as fromTotalItems from './total-visits.reducer';

export interface VisitsState {
  visits: fromVisits.State;
  totalItems: fromTotalItems.State
}

export interface State extends fromRoot.State {
  visits: VisitsState;
}

export const reducers: ActionReducerMap<VisitsState> = {
  visits: fromVisits.reducer,
  totalItems: fromTotalItems.reducer,
};

export const selectVisitsState = createFeatureSelector<State, VisitsState>('visits');

export const getVisitEntitiesState = createSelector(
  selectVisitsState,
  (state: VisitsState) => state.visits
);

export const {
  selectEntities: getVisitEntities,
  selectAll: getVisits,
} = fromVisits.adapter.getSelectors(getVisitEntitiesState);

export const selectTotalItemsState = createSelector(
  selectVisitsState,
  (state: VisitsState) => state.totalItems
);

export const getTotalItems = createSelector(
  selectTotalItemsState,
  fromTotalItems.getTotalItems
);

export const getPending = createSelector(
  selectTotalItemsState,
  fromTotalItems.getPending
);