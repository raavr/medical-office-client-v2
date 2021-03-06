import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { Credentials } from '../models/user';
import { AuthService } from '../services/auth.service';
import { AuthEffects } from '../effects/auth.effects';
import {
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  LoginRedirect,
  DecodeTokenSuccess,
  TokenValid
} from '../actions/auth.actions';
import { Token, TokenData } from '../models/token';
import { TokenService } from '../services/token.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileGet } from 'src/app/account/actions/profile.action';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { Signup, SignupSuccess, SignupFailure } from '../actions/signup.actions';
import * as AlertActions from '../../core/actions/alert.actions';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let authService: any;
  let actions$: Observable<any>;
  let routerService: any;
  let tokenService: TokenService;
  let jwtHelperService: JwtHelperService;
  let spyTokenExpired;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: { login: () => {}, signup: () => {} }
        },
        {
          provide: Router,
          useValue: { navigate: () => {} }
        },
        TokenService,
        JwtHelperService,
        {
          provide: JWT_OPTIONS,
          useFactory: () => {}
        }
      ]
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
    actions$ = TestBed.get(Actions);
    routerService = TestBed.get(Router);
    tokenService = TestBed.get(TokenService);
    jwtHelperService = TestBed.get(JwtHelperService);

    spyOn(routerService, 'navigate').and.callThrough();
    spyOn(tokenService, 'removeToken').and.callFake(() => {});
    spyOn(tokenService, 'setToken');
    spyOn(tokenService, 'getToken').and.returnValue('some_token');
    spyTokenExpired = spyOn(jwtHelperService, 'isTokenExpired');
  });

  it('should return the AlertShow action and the LoginSuccess action with token object if login succeeds', () => {
    const credentials: Credentials = {
      email: 'test@example.com',
      password: ''
    };
    const token = { token: 'some_token' } as Token;
    const action = new Login(credentials);
    const completion = new LoginSuccess(token);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: token });
    const expected = cold('--b', { b: completion });
    authService.login = () => response;

    expect(effects.login$).toBeObservable(expected);
  });

  it('should return the LoginFailure action if the login service throws an Error', () => {
    const credentials: Credentials = {
      email: 'test@example.com',
      password: ''
    };
    const message = 'Invalid email or password';
    const error = { error: { message } };
    const action = new Login(credentials);
    const completion = [
      new LoginFailure(),
      new AlertShow({ message, alertType: ALERT_TYPE.WARN })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    authService.login = () => response;

    expect(effects.login$).toBeObservable(expected);
  });

  it('should return the TokenValid action with token object if login succeeds', done => {
    const token = { token: 'some_token' } as Token;
    const action = new LoginSuccess(token);
    const completion = new TokenValid(token);

    actions$ = of(action);

    effects.loginSuccess$.subscribe(result => {
      expect(result).toEqual(completion);
      expect(tokenService.setToken).toHaveBeenCalledWith(token.token);
      expect(routerService.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('should return the DecodeTokenSuccess action and ProfileGet action when tokenValid$ effect is called and the token is not expired', () => {
    const tokenData: TokenData = { iat: 1, exp: 2, sub: '1', role: 'doctor' };
    spyOn(jwtHelperService, 'decodeToken').and.returnValue(tokenData);
    const action = new TokenValid({ token: 'some_token' });

    const completion = [
      new DecodeTokenSuccess({ id: '1', role: 'doctor' }),
      new ProfileGet('1')
    ];

    actions$ = hot('-a---', { a: action });
    const expected = cold('-(bc)', { b: completion[0], c: completion[1] });

    expect(effects.tokenValid$).toBeObservable(expected);
  });

  it('should navigate to "/" when loginSuccess$ effect is called', done => {
    const action = new LoginSuccess({ token: 'some_token' });
    actions$ = of(action);
    effects.loginSuccess$.subscribe(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('should remove token when logout$ effect is called', done => {
    const action = new Logout();
    actions$ = of(action);
    effects.logout$.subscribe(() => {
      expect(tokenService.removeToken).toHaveBeenCalled();
      done();
    });
  });

  it('should navigate to "/login" when loginRedirect$ effect is called', done => {
    const action = new Logout();
    actions$ = of(action);
    effects.loginRedirect$.subscribe(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should navigate to "/login" when loginRedirect$ effect is called', done => {
    const action = new LoginRedirect();
    actions$ = of(action);
    effects.loginRedirect$.subscribe(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should navigate to "/login" when loginRedirect$ effect is called', done => {
    const action = new SignupSuccess();
    actions$ = of(action);
    effects.loginRedirect$.subscribe(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should return the SignupSuccess action and the AlertShow action if signup succeeds', () => {
    const signupData = {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'test123',
      confirmPassword: 'test123'
    };
    const action = new Signup(signupData);
    const message = 'Signup ok';
    const completion = [
      new SignupSuccess(),
      new AlertActions.AlertShow({
        message,
        alertType: ALERT_TYPE.SUCCESS
      })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: { message } });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    authService.signup = () => response;

    expect(effects.signup$).toBeObservable(expected);
  });

  it('should return the SignupFailure action and the AlertShow action if the login service throws an Error', () => {
    const signupData = {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'test123',
      confirmPassword: 'test123'
    };
    const message = 'Something went wrong';
    const error = { error: { message } };
    const action = new Signup(signupData);
    const completion = [
      new SignupFailure(),
      new AlertShow({ message, alertType: ALERT_TYPE.WARN })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    authService.signup = () => response;

    expect(effects.signup$).toBeObservable(expected);
  });
});
