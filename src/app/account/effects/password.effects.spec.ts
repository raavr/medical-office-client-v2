import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { hot, cold } from 'jasmine-marbles';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as utilFun from '../../core/utils/utils';
import { ChangePassword, ChangePasswordSuccess, ChangePasswordFailure } from '../actions/password.action';
import { PasswordEffects } from './password.effects';
import { PasswordService } from '../services/password.service';

describe('PasswordEffects', () => {
  let actions$: Observable<any>;
  let effects: PasswordEffects;
  let service: PasswordService;
  let status: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PasswordEffects,
        provideMockActions(() => actions$),
        {
          provide: PasswordService,
          useValue: {
            changePassword: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(PasswordEffects);
    service = TestBed.get(PasswordService);
    status = 401;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return the ChangePasswordSuccess action with and the AlertShow with a message if changePassword effect succeeds', () => {
    const passwords = { oldPassword: 'test123', password: 'pass123', confirmPassword: 'pass123' };
        const message = 'OK';

    const action = new ChangePassword(passwords);
    const completion = [
      new ChangePasswordSuccess(),
      new AlertShow({ message, alertType: ALERT_TYPE.SUCCESS })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: { message } });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    service.changePassword = () => response;

    expect(effects.changePassword$).toBeObservable(expected);
  });

  it('should return the "error" actions if changePassword effect fails', () => {
    const passwords = { oldPassword: 'test123', password: 'pass123', confirmPassword: 'pass123' };
    const message = 'Error';

    const action = new ChangePassword(passwords);
    const completion = [
      new ChangePasswordFailure(),
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      }),
    ];
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue(completion);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--(bc)', {
      b: completion[0],
      c: completion[1],
    });
    service.changePassword = () => response;

    expect(effects.changePassword$).toBeObservable(expected);
  });
});
