import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { AccessTokenGuard } from './access-token.guard';
import * as AuthActions from '../actions/auth.actions';
import * as fromRoot from '../reducers';
import * as fromAuth from '../reducers';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import * as authRoutes from '../auth.routes';

describe('Auth Guard', () => {
  let guard: AccessTokenGuard;
  let store: Store<any>;
  let tokenService: TokenService;
  let jwtService: JwtHelperService;
  let router: Router;
  let isUnprotectedRouteSpy: jasmine.Spy;
  let activateRouteSnapshot = {
    url: [{ path: 'path' }]
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      providers: [
        {
          provide: TokenService,
          useValue: {
            getToken: () => 'token'
          }
        },
        {
          provide: JwtHelperService,
          useValue: {
            isTokenExpired: () => true
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {}
          }
        }
      ]
    });

    guard = TestBed.get(AccessTokenGuard);
    store = TestBed.get(Store);

    tokenService = TestBed.get(TokenService);
    jwtService = TestBed.get(JwtHelperService);
    router = TestBed.get(Router);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate');
    
    isUnprotectedRouteSpy = jasmine
      .createSpy('isUnprotectedRoute')
      .and.returnValue(true);
    spyOnProperty(authRoutes, 'isUnprotectedRoute', 'get').and.returnValue(
      isUnprotectedRouteSpy
    );
  });

  it('should return true if the token is expired and the isUnprotectedRoute method returns true', () => {
    spyOn(jwtService, 'isTokenExpired').and.returnValue(true);
    isUnprotectedRouteSpy.and.returnValue(true);
    const expected = cold('(a|)', { a: true });

    expect(guard.canActivate(activateRouteSnapshot as ActivatedRouteSnapshot)).toBeObservable(expected);
  });

  it('should return false if the token is expired and the isUnprotectedRoute method returns false', () => {
    spyOn(jwtService, 'isTokenExpired').and.returnValue(true);
    isUnprotectedRouteSpy.and.returnValue(false);
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate(activateRouteSnapshot as ActivatedRouteSnapshot)).toBeObservable(expected);
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.LoginRedirect());
  });

  it('should return true if the token isn\'t expired and the isUnprotectedRoute method returns false', () => {
    spyOn(jwtService, 'isTokenExpired').and.returnValue(false);
    isUnprotectedRouteSpy.and.returnValue(false);
    const expected = cold('(a|)', { a: true });

    expect(guard.canActivate(activateRouteSnapshot as ActivatedRouteSnapshot)).toBeObservable(expected);
    expect(store.dispatch).toHaveBeenCalledWith(new AuthActions.TokenValid({ token: 'token' }))
  });

  it('should return false if the token isn\'t expired and the isUnprotectedRoute method returns true', () => {
    spyOn(jwtService, 'isTokenExpired').and.returnValue(false);
    isUnprotectedRouteSpy.and.returnValue(true);
    const expected = cold('(a|)', { a: false });

    expect(guard.canActivate(activateRouteSnapshot as ActivatedRouteSnapshot)).toBeObservable(expected);
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  });

});
