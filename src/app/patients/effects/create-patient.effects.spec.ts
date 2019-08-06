import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { CreatePatientEffects } from './create-patient.effects';
import { PatientsService } from '../services/patients.service';
import { hot, cold } from 'jasmine-marbles';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as utilFun from '../../core/utils/utils';

import {
  CreatePatient,
  CreatePatientSuccess,
  CreatePatientFailure
} from '../actions/create-patient.action';

describe('CreatePatientsEffects', () => {
  let actions$: Observable<any>;
  let effects: CreatePatientEffects;
  let service: PatientsService;
  let status: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreatePatientEffects,
        provideMockActions(() => actions$),
        {
          provide: PatientsService,
          useValue: {
            createPatient: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(CreatePatientEffects);
    service = TestBed.get(PatientsService);
    status = 401;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return the AlertShow action and the CreatePatientSuccess action if createPatient effect succeeds', () => {
    const user = {
      id: '1'
    };
    const message = 'Konto pacjenta zostało poprawnie utworzone';
    const action = new CreatePatient(user);
    const completion = [
      new AlertShow({ message, alertType: ALERT_TYPE.SUCCESS }),
      new CreatePatientSuccess(user)
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: user });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    service.createPatient = () => response;

    expect(effects.createPatient$).toBeObservable(expected);
  });

  it('should return the "error" actions if removePatient effect fails', () => {
    const message = 'Error';
    const user = {
      id: '1'
    };
    const action = new CreatePatient(user);
    const completion = [
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      }),
      new CreatePatientFailure()
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
      c: completion[1]
    });
    service.createPatient = () => response;

    expect(effects.createPatient$).toBeObservable(expected);
  });
});
