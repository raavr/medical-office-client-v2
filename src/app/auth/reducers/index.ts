import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromAuth from './auth.reducer';
import * as fromLogin from './login.reducer';

export interface AuthState {
  session: fromAuth.State;
  login: fromLogin.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  session: fromAuth.reducer,
  login: fromLogin.reducer,
};

export const selectAuthState = createFeatureSelector<State, AuthState>('auth');

export const selectAuthSessionState = createSelector(
  selectAuthState,
  (state: AuthState) => state.session
);
export const getUser = createSelector(selectAuthSessionState, fromAuth.getUser);
export const getLoggedIn = createSelector(getUser, user => !!user);
export const isDoctor = createSelector(getUser, user => user && user.role === 'doctor');

export const selectLoginState = createSelector(
  selectAuthState,
  (state: AuthState) => state.login
);
export const getLoginError = createSelector(
  selectLoginState,
  fromLogin.getError
);
export const getLoginPending = createSelector(
  selectLoginState,
  fromLogin.getPending
);
