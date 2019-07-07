import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromVisits from './visits.reducer';
import * as fromTotalItems from './total-visits.reducer';
import * as fromVisitsFilter from './visits-filter.reducer';
import * as fromBookVisit from './book-visit.reducer';

export interface VisitsState {
  visits: fromVisits.State;
  totalItems: fromTotalItems.State;
  filter: fromVisitsFilter.State;
  booking: fromBookVisit.State;
}

export interface State extends fromRoot.State {
  visits: VisitsState;
}

export const reducers: ActionReducerMap<VisitsState> = {
  visits: fromVisits.reducer,
  totalItems: fromTotalItems.reducer,
  filter: fromVisitsFilter.reducer,
  booking: fromBookVisit.reducer,
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

export const selectVisitsFilterState = createSelector(
  selectVisitsState,
  (state: VisitsState) => state.filter
);

export const getVisitsFilter = createSelector(
  selectVisitsFilterState,
  fromVisitsFilter.getVisitsFilter
)

export const getVisitsFilterType = createSelector(
  selectVisitsFilterState,
  fromVisitsFilter.getVisitsFilterType
)

export const selectBookingState = createSelector(
  selectVisitsState,
  (state: VisitsState) => state.booking
);

export const getDisabledDates = createSelector(
  selectBookingState,
  fromBookVisit.getDisabledDates
);

export const getAvailableTimes = createSelector(
  selectBookingState,
  fromBookVisit.getAvailableTimes
);

export const getPatientsByName = createSelector(
  selectBookingState,
  fromBookVisit.getPatientsByName
);

export const getDoctors = createSelector(
  selectBookingState,
  fromBookVisit.getDoctors
);

export const getBookVisitPending = createSelector(
  selectBookingState,
  fromBookVisit.getBookVisitPending
);
