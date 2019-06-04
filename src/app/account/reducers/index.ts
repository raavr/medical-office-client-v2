import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromProfile from './profile.reducer';
import * as fromAccounts from './accounts.reducer';

export interface AccountsState {
  accounts: fromAccounts.State;
  profile: fromProfile.State;
}

export interface State extends fromRoot.State {
  accounts: AccountsState;
}

export const reducers: ActionReducerMap<AccountsState> = {
  accounts: fromAccounts.reducer,
  profile: fromProfile.reducer,
};

export const selectAccountsState = createFeatureSelector<State, AccountsState>('accounts');

export const getAccountEntitiesState = createSelector(
  selectAccountsState,
  (state: AccountsState) => state.accounts
);

export const {
  selectEntities: getAccountEntities,
} = fromAccounts.adapter.getSelectors(getAccountEntitiesState);

export const selectProfileState = createSelector(
  selectAccountsState,
  (state: AccountsState) => state.profile
);

export const getProfileId = createSelector(
  selectProfileState, 
  fromProfile.getProfileId
);

export const getProfilePending = createSelector(
  selectProfileState,
  fromProfile.getProfilePending
);

export const getProfile = createSelector(
  getAccountEntities,
  getProfileId,
  (accounts, id) => accounts[id]
);