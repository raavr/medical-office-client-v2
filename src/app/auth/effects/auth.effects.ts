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
import { of, iif } from 'rxjs';
import { 
  catchError, 
  exhaustMap, 
  map, 
  tap, 
  mergeMap
} from 'rxjs/operators';
import { Credentials, User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token, TokenData } from '../models/token';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((credentials: Credentials) => 
      this.authSerivce.login(credentials).pipe(
        map(token => new LoginSuccess(token)),
        catchError(({ error: { message } }) => of(new LoginFailure(message)))
      )
    )
  )

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    map(action => action.payload),
    tap(({ token }: Token) => this.tokenService.setToken(token)),
    map((token: Token) => new DecodeToken(token)),
    tap(() => this.router.navigate(['/'])),
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
          map((token: string) => this.jwtHelper.decodeToken(token) as TokenData),
          map(({ sub, role }: User) => new DecodeTokenSuccess({ sub, role })),
        )
      )
    )
  );

  @Effect()
  autoLogin$ = this.actions$.pipe(
    ofType<AutoLogin>(AuthActionTypes.AutoLogin),
    map(() => this.tokenService.getToken()),
    map((token: string) => new DecodeToken({ token }))
  )

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => this.tokenService.removeToken())
  )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(
      AuthActionTypes.LoginRedirect,
      AuthActionTypes.Logout,
      AuthActionTypes.TokenInvalid
    ),
    tap(() => this.router.navigate(['/login']))
  );

  constructor(
    private actions$: Actions, 
    private authSerivce: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}
}
