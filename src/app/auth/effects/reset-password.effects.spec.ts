import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { ResetPasswordEffects } from '../effects/reset-password.effects';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { ResetPasswordService } from '../services/reset-password.service';
import {
  ResetPasswordRequestSuccess,
  ResetPasswordRequest,
  ResetPasswordRequestFailure,
  ResetPasswordSuccess,
  ResetPassword,
  ResetPasswordFailure
} from '../actions/reset-password.actions';

describe('ResetPasswordEffects', () => {
  let effects: ResetPasswordEffects;
  let resetService: ResetPasswordService;
  let actions$: Observable<any>;
  let routerService: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResetPasswordEffects,
        provideMockActions(() => actions$),
        {
          provide: ResetPasswordService,
          useValue: {
            setNewPassword: () => {},
            resetPassword: () => {},
            checkValidToken: () => {}
          }
        },
        {
          provide: Router,
          useValue: { navigate: () => {} }
        }
      ]
    });

    effects = TestBed.get(ResetPasswordEffects);
    resetService = TestBed.get(ResetPasswordService);
    actions$ = TestBed.get(Actions);
    routerService = TestBed.get(Router);

    spyOn(routerService, 'navigate').and.callThrough();
  });

  it('should return the AlertShow action and the ResetPasswordRequestSuccess action if the resetPasswordRequest effect succeeds', () => {
    const message = 'OK';
    const email = 'test@example.com';
    const action = new ResetPasswordRequest(email);
    const completion = [
      new ResetPasswordRequestSuccess(),
      new AlertShow({ message, alertType: ALERT_TYPE.SUCCESS })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: { message } });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    resetService.resetPassword = () => response;

    expect(effects.resetPasswordRequest$).toBeObservable(expected);
  });

  it('should return the ResetPasswordRequestFailure action and the AlertShow action if the login service throws an Error', () => {
    const message = 'Invalid email or password';
    const error = { error: { message } };
    const email = 'test@example.com';
    const action = new ResetPasswordRequest(email);
    const completion = [
      new ResetPasswordRequestFailure(),
      new AlertShow({ message, alertType: ALERT_TYPE.WARN })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    resetService.resetPassword = () => response;

    expect(effects.resetPasswordRequest$).toBeObservable(expected);
  });

  it('should navigate to "/" when resetPasswordRequestSuccess$ effect is called with the ResetPasswordRequestSuccess action ', done => {
    const action = new ResetPasswordRequestSuccess();
    actions$ = of(action);
    effects.resetPasswordRequestSuccess$.subscribe(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should navigate to "/" when resetPasswordRequestSuccess$ effect is called with the ResetPasswordSuccess action', done => {
    const action = new ResetPasswordSuccess();
    actions$ = of(action);
    effects.resetPasswordRequestSuccess$.subscribe(() => {
      expect(routerService.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should return the AlertShow action and the ResetPasswordSuccess action if the resetPassword effect succeeds', () => {
    const message = 'OK';
    const tokenWithPass = { passwordToken: 'token', password: 'pass1234' };
    const action = new ResetPassword(tokenWithPass);
    const completion = [
      new ResetPasswordSuccess(),
      new AlertShow({ message, alertType: ALERT_TYPE.SUCCESS })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: { message } });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    resetService.setNewPassword = () => response;

    expect(effects.resetPassword$).toBeObservable(expected);
  });

  it('should return the ResetPasswordFailure action and the AlertShow action if the login service throws an Error', () => {
    const message = 'Invalid email or password';
    const error = { error: { message } };
    const tokenWithPass = { passwordToken: 'token', password: 'pass1234' };
    const action = new ResetPassword(tokenWithPass);
    const completion = [
      new ResetPasswordFailure(),
      new AlertShow({ message, alertType: ALERT_TYPE.WARN })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, error);
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    resetService.setNewPassword = () => response;

    expect(effects.resetPassword$).toBeObservable(expected);
  });
});
