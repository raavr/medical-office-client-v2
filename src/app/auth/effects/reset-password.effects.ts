import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  switchMap
} from 'rxjs/operators';
import { ResetPasswordService } from '../services/reset-password.service';
import * as ResetPasswordActions from '../actions/reset-password.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import { Router } from '@angular/router';
import { PasswordToken } from '../models/token';

@Injectable()
export class ResetPasswordEffects {
  constructor(
    private actions$: Actions,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {}

  @Effect()
  resetPasswordRequest$ = this.actions$.pipe(
    ofType<ResetPasswordActions.ResetPasswordRequest>(
      ResetPasswordActions.ResetPasswordActionTypes.ResetPasswordRequest
    ),
    map(action => action.payload),
    exhaustMap((email: string) =>
      this.resetPasswordService.resetPassword(email).pipe(
        switchMap(({ message }) => [
          new ResetPasswordActions.ResetPasswordRequestSuccess(),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          })
        ]),
        catchError(({ error: { message } }) => [
          new ResetPasswordActions.ResetPasswordRequestFailure(),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.WARN
          })
        ])
      )
    )
  );

  @Effect({ dispatch: false })
  resetPasswordRequestSuccess$ = this.actions$.pipe(
    ofType(
      ResetPasswordActions.ResetPasswordActionTypes.ResetPasswordRequestSuccess,
      ResetPasswordActions.ResetPasswordActionTypes.ResetPasswordSuccess
    ),
    tap(() => this.router.navigate(['/login']))
  );

  @Effect()
  resetPassword$ = this.actions$.pipe(
    ofType<ResetPasswordActions.ResetPassword>(
      ResetPasswordActions.ResetPasswordActionTypes.ResetPassword
    ),
    map(action => action.payload),
    exhaustMap((tokenWithPass: PasswordToken) =>
      this.resetPasswordService.setNewPassword(tokenWithPass).pipe(
        switchMap(({ message }) => [
          new ResetPasswordActions.ResetPasswordSuccess(),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          })
        ]),
        catchError(({ error: { message } }) => [
          new ResetPasswordActions.ResetPasswordFailure(),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.WARN
          })
        ])
      )
    )
  );
}
