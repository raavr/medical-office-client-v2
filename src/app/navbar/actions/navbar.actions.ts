import { Action } from '@ngrx/store';

export enum NavbarActionTypes {
  OpenSidenav = '[Navbar] Open Sidenav',
  CloseSidenav = '[Navbar] Close Sidenav',
}

export class OpenSidenav implements Action {
  readonly type = NavbarActionTypes.OpenSidenav;
}

export class CloseSidenav implements Action {
  readonly type = NavbarActionTypes.CloseSidenav;
}

export type NavbarActionsUnion = OpenSidenav | CloseSidenav;
