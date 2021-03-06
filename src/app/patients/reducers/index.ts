import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromTotalItems from './total-patients.reducer';
import * as fromPatientsFilter from './patients-filter.reducer';
import * as fromCreatePatient from './create-patient.reducer';

export interface PatientsState {
  totalItems: fromTotalItems.State;
  filter: fromPatientsFilter.State;
  creation:fromCreatePatient.State;
}

export interface State extends fromRoot.State {
  patients: PatientsState;
}

export const reducers: ActionReducerMap<PatientsState> = {
  totalItems: fromTotalItems.reducer,
  filter: fromPatientsFilter.reducer,
  creation: fromCreatePatient.reducer
};

export const selectPatientsState = createFeatureSelector<State, PatientsState>(
  'patients'
);

export const selectTotalItemsState = createSelector(
  selectPatientsState,
  (state: PatientsState) => state.totalItems
);

export const getTotalItems = createSelector(
  selectTotalItemsState,
  fromTotalItems.getTotalItems
);

export const getPending = createSelector(
  selectTotalItemsState,
  fromTotalItems.getPending
);

export const selectPatientsFilterState = createSelector(
  selectPatientsState,
  (state: PatientsState) => state.filter
);

export const getPatientsFilter = createSelector(
  selectPatientsFilterState,
  fromPatientsFilter.getPatientsFilter
);

export const selectCreationState = createSelector(
  selectPatientsState,
  (state: PatientsState) => state.creation
);

export const getCreatePatientPending = createSelector(
  selectCreationState,
  fromCreatePatient.getPending
);