import * as AuthActions from 'src/app/auth/actions/auth.actions';
import { Action } from '@ngrx/store';

export function withUnauthorizeErrorAction(
  actions: Array<Action>,
  errorStatus: number
): Array<Action> {
  return errorStatus === 401 ? [...actions, new AuthActions.Logout()] : actions;
}
