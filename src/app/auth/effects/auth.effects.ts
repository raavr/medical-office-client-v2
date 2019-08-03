import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  DecodeTokenSuccess,
  DecodeToken,
  AutoLogin,
  TokenInvalid
} from '../actions/auth.actions';
import {
  SignupActionTypes,
  Signup,
  SignupSuccess,
  SignupFailure
} from '../actions/signup.actions';
import { of, iif } from 'rxjs';
import {
  catchError,
  exhaustMap,
  map,
  tap,
  mergeMap,
  switchMap
} from 'rxjs/operators';
import { Credentials } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token, TokenData } from '../models/token';
import { ProfileGet } from 'src/app/account/actions/profile.action';
import { SignupData } from '../models/signup';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as AlertActions from 'src/app/core/actions/alert.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((credentials: Credentials) =>
      this.authSerivce.login(credentials).pipe(
        map(token => new LoginSuccess(token)),
        catchError(({ error: { message } }) => [
          new LoginFailure(),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.WARN
          })
        ])
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    tap(({ token }: Token) => this.tokenService.setToken(token)),
    map((token: Token) => new DecodeToken(token)),
    tap(() => this.router.navigate(['/']))
  );

  @Effect()
  decodeToken$ = this.actions$.pipe(
    ofType<DecodeToken>(AuthActionTypes.DecodeToken),
    map(action => action.payload),
    mergeMap(({ token }) =>
      iif(
        () => this.jwtHelper.isTokenExpired(token),
        of(new TokenInvalid()),
        of(token).pipe(
          map(
            (token: string) => this.jwtHelper.decodeToken(token) as TokenData
          ),
          switchMap(({ sub, role }) => [
            new DecodeTokenSuccess({ id: sub, role }),
            new ProfileGet(sub)
          ])
        )
      )
    )
  );

  @Effect()
  autoLogin$ = this.actions$.pipe(
    ofType<AutoLogin>(AuthActionTypes.AutoLogin),
    map(() => this.tokenService.getToken()),
    map((token: string) => new DecodeToken({ token }))
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => this.tokenService.removeToken())
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      AuthActionTypes.LoginRedirect,
      AuthActionTypes.Logout,
      AuthActionTypes.TokenInvalid,
      SignupActionTypes.SignupSuccess
    ),
    tap(() => this.router.navigate(['/login']))
  );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType<Signup>(SignupActionTypes.Signup),
    map(action => action.payload),
    exhaustMap((signup: SignupData) =>
      this.authSerivce.signup(signup).pipe(
        switchMap(({ message }) => [
          new SignupSuccess(),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          })
        ]),
        catchError(({ error: { message } }) => [
          new SignupFailure(),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.WARN
          })
        ])
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authSerivce: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
}
