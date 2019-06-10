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
  DecodeToken,
  DecodeTokenSuccess,
  AutoLogin,
  TokenInvalid
} from '../actions/auth.actions';
import { Token, TokenData } from '../models/token';
import { TokenService } from '../services/token.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ProfileGet } from 'src/app/account/actions/profile.action';

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
          useValue: { login: () => {} }
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

  it('should return the LoginSuccess action with token object if login succeeds', () => {
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
    const action = new Login(credentials);
    const completion = new LoginFailure('Invalid email or password');
    const error = { error: { message: 'Invalid email or password' } };

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--b', { b: completion });
    authService.login = () => response;

    expect(effects.login$).toBeObservable(expected);
  });

  it('should return the DecodeToken action with token object if login succeeds', done => {
    const token = { token: 'some_token' } as Token;
    const action = new LoginSuccess(token);
    const completion = new DecodeToken(token);

    actions$ = of(action);

    effects.loginSuccess$.subscribe(result => {
      expect(result).toEqual(completion);
      expect(tokenService.setToken).toHaveBeenCalledWith(token.token);
      done();
    });
  });

  it('should return the DecodeTokenSuccess action and ProfileGet action when decodeToken$ effect is called and the token is not expired', () => {
    const tokenData: TokenData = { iat: 1, exp: 2, sub: '1', role: 'doctor' };
    spyOn(jwtHelperService, 'decodeToken').and.returnValue(tokenData);
    spyTokenExpired.and.returnValue(false);
    const action = new DecodeToken({ token: 'some_token' });

    const completion = [
      new DecodeTokenSuccess({ sub: '1', role: 'doctor' }),
      new ProfileGet('1')
    ];

    actions$ = hot('-a---', { a: action });
    const expected = cold('-(bc)', { b: completion[0], c: completion[1] });

    expect(effects.decodeToken$).toBeObservable(expected);
  });

  it('should return the TokenInvalid action when decodeToken$ effect is called and the token is expired', done => {
    spyTokenExpired.and.returnValue(true);
    const action = new DecodeToken({ token: 'some_token' });

    actions$ = of(action);

    effects.decodeToken$.subscribe(result => {
      expect(result).toEqual(new TokenInvalid());
      done();
    });
  });

  it('should return the DecodeToken action when autoLogin$ effect is called with a valid token', done => {
    const action = new AutoLogin();

    actions$ = of(action);

    effects.autoLogin$.subscribe(result => {
      expect(result).toEqual(new DecodeToken({ token: 'some_token' }));
      done();
    });
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

  it('should navigate to "/login" when logout$ effect is called', done => {
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

  it('should navigate to "/login" when TokenInvalid$ effect is called', done => {
    const action = new TokenInvalid();
    actions$ = of(action);
    effects.loginRedirect$.subscribe(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
