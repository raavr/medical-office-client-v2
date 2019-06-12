import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as PasswordActions from '../actions/password.action';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import { PasswordService } from '../services/password.service';

@Injectable()
export class PasswordEffects {
  constructor(
    private actions$: Actions,
    private passwordService: PasswordService
  ) {}

  @Effect()
  changePassword$ = this.actions$.pipe(
    ofType<PasswordActions.ChangePassword>(
      PasswordActions.PasswordActionTypes.ChangePassword
    ),
    map(action => action.payload),
    exhaustMap(payload =>
      this.passwordService.changePassword(payload).pipe(
        switchMap(({ message }) => [
          new PasswordActions.ChangePasswordSuccess(),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          })
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new PasswordActions.ChangePasswordFailure(),
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              })
            ],
            status
          )
        )
      )
    )
  );
}
