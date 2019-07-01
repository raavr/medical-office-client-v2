import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DoctorActionEffects } from './doctor-action.effects';
import { DoctorActionService } from '../services/doctor-action.service';
import {
  UpdateStatus,
  UpdateStatusSuccess
} from '../actions/visits-status.action';
import { hot, cold } from 'jasmine-marbles';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as utilFun from '../../core/utils/utils';
import { VisitStatus } from '../models/visit';

describe('DoctorActionEffects', () => {
  let actions$: Observable<any>;
  let effects: DoctorActionEffects;
  let service: DoctorActionService;
  let status: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DoctorActionEffects,
        provideMockActions(() => actions$),
        {
          provide: DoctorActionService,
          useValue: {
            updateVisitsStatus: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(DoctorActionEffects);
    service = TestBed.get(DoctorActionService);
    status = 401;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return the UpdateStatusSuccess action with a changes object and the AlertShow with a message if updateVisitsStatus effect succeeds', () => {
    const visitsToUpdate = {
      status: VisitStatus.CANCELED,
      visitsIds: [1],
      reason: ''
    };
    const message = 'OK';

    const action = new UpdateStatus(visitsToUpdate);
    const completion = [
      new UpdateStatusSuccess([
        {
          id: visitsToUpdate.visitsIds[0],
          changes: {
            status: visitsToUpdate.status,
            rejectReason: visitsToUpdate.reason
          }
        }
      ]),
      new AlertShow({ message, alertType: ALERT_TYPE.SUCCESS })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: { message } });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    service.updateVisitsStatus = () => response;

    expect(effects.updateVisitsStatus$).toBeObservable(expected);
  });

  it('should return the AlertShow action if updateVisitsStatus effect fails', () => {
    const visitsToUpdate = {
      status: VisitStatus.CANCELED,
      visitsIds: [1],
      reason: ''
    };
    const message = 'Error';

    const action = new UpdateStatus(visitsToUpdate);
    const completion = [
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      })
    ];
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue(completion);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--b', {
      b: completion[0]
    });
    service.updateVisitsStatus = () => response;

    expect(effects.updateVisitsStatus$).toBeObservable(expected);
  });
});
