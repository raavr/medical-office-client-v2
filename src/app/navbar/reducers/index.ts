import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromNavbar from './navbar.reducers';

export interface NavbarState {
  sidenav: fromNavbar.State
}

export interface State extends fromRoot.State {
  navbar: fromNavbar.State;
}

export const reducers: ActionReducerMap<NavbarState> = {
  sidenav: fromNavbar.reducer,
};

export const getNavbarState = createFeatureSelector<State, NavbarState>('navbar');

export const getSidebar = createSelector(
  getNavbarState,
  (state: NavbarState) => state.sidenav
);

export const getShowSidenav = createSelector(
  getSidebar,
  fromNavbar.getShowSidenav
)