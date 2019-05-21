import {
  NavbarActions
} from '../actions';

export interface State {
  showSidenav: boolean;
}

const initialState: State = {
  showSidenav: false,
};

export function reducer(
  state: State = initialState,
  action: NavbarActions.NavbarActionsUnion
): State {
  switch (action.type) {
    case NavbarActions.NavbarActionTypes.CloseSidenav:
      return {
        showSidenav: false,
      };

    case NavbarActions.NavbarActionTypes.OpenSidenav:
      return {
        showSidenav: true,
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
