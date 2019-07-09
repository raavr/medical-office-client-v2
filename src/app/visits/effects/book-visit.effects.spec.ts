import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BookVisitEffects } from './book-visit.effects';
import { BookVisitService } from '../services/book-visit.service';
import * as fromRoot from '../../core/reducers';
import * as fromVisits from '../reducers';
import { hot, cold } from 'jasmine-marbles';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as utilFun from '../../core/utils/utils';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import {
  GetUnavailableDates,
  GetUnavailableDatesSuccess,
  GetAvailableTime,
  GetAvailableTimeSuccess,
  GetPatientsByNameSuccess,
  GetPatientsByName,
  GetDoctorsSuccess,
  BookVisit,
  BookVisitSuccess,
  BookVisitFailure,
  GetDoctors
} from '../actions/book-visit.action';
import { User } from 'src/app/auth/models/user';
import { GetVisits } from '../actions/visits.action';

describe('BookVisitEffects', () => {
  let actions$: Observable<any>;
  let effects: BookVisitEffects;
  let service: BookVisitService;
  let status: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          visits: combineReducers(fromVisits.reducers)
        })
      ],
      providers: [
        BookVisitEffects,
        provideMockActions(() => actions$),
        {
          provide: BookVisitService,
          useValue: {
            getUnavailableDates: () => {},
            getAvailableTimes: () => {},
            getPatientsByName: () => {},
            getDoctors: () => {},
            bookVisit: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(BookVisitEffects);
    service = TestBed.get(BookVisitService);
    status = 401;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return the GetUnavailableDatesSuccess action if getUnavailableDates effect succeeds', () => {
    const disabledDates = { disabledDates: ['12/07/2019', '13/07/2019'] };
    const action = new GetUnavailableDates();
    const completion = new GetUnavailableDatesSuccess(disabledDates);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: disabledDates });
    const expected = cold('--b', { b: completion });
    service.getUnavailableDates = () => response;

    expect(effects.getUnavailableDates$).toBeObservable(expected);
  });

  it('should return the "error" actions if getUnavailableDates effect fails', () => {
    const message = 'Error';

    const action = new GetUnavailableDates();
    const completion = new AlertShow({
      message,
      alertType: ALERT_TYPE.WARN
    });
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue([completion]);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--b', {
      b: completion
    });
    service.getUnavailableDates = () => response;

    expect(effects.getUnavailableDates$).toBeObservable(expected);
  });

  it('should return the GetAvailableTimeSuccess action if getAvailableTimes effect succeeds', () => {
    const visitTimes = [{ visitTime: '10:30' }, { visitTime: '11:30' }];
    const action = new GetAvailableTime({ date: '12/07/2019', doctorId: '1' });
    const completion = new GetAvailableTimeSuccess(visitTimes);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: visitTimes });
    const expected = cold('--b', { b: completion });
    service.getAvailableTimes = () => response;

    expect(effects.getAvailableTimes$).toBeObservable(expected);
  });

  it('should return the "error" actions if getAvailableTimes effect fails', () => {
    const message = 'Error';
    const action = new GetAvailableTime({ date: '12/07/2019', doctorId: '1' });
    const completion = new AlertShow({
      message,
      alertType: ALERT_TYPE.WARN
    });
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue([completion]);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--b', {
      b: completion
    });
    service.getAvailableTimes = () => response;

    expect(effects.getAvailableTimes$).toBeObservable(expected);
  });

  it('should return the GetPatientsByNameSuccess action if getPatientsByName effect succeeds', () => {
    const users: User[] = [
      {
        sub: '1',
        name: 'Rafal',
        role: 'patient'
      }
    ];
    const action = new GetPatientsByName('Ra');
    const completion = new GetPatientsByNameSuccess(users);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: users });
    const expected = cold('--b', { b: completion });
    service.getPatientsByName = () => response;

    expect(effects.getPatientsByName$).toBeObservable(expected);
  });

  it('should return the "error" actions if getPatientsByName effect fails', () => {
    const message = 'Error';
    const action = new GetPatientsByName('Ra');
    const completion = new AlertShow({
      message,
      alertType: ALERT_TYPE.WARN
    });
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue([completion]);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--b', {
      b: completion
    });
    service.getPatientsByName = () => response;

    expect(effects.getPatientsByName$).toBeObservable(expected);
  });

  it('should return the GetDoctorsSuccess action if getDoctors effect succeeds', () => {
    const doctors: User[] = [
      {
        sub: '1',
        name: 'Rafal',
        role: 'doctor'
      }
    ];
    const action = new GetDoctors();
    const completion = new GetDoctorsSuccess(doctors);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: doctors });
    const expected = cold('--b', { b: completion });
    service.getDoctors = () => response;

    expect(effects.getDoctors$).toBeObservable(expected);
  });

  it('should return the "error" actions if getDoctors effect fails', () => {
    const message = 'Error';
    const action = new GetDoctors();
    const completion = new AlertShow({
      message,
      alertType: ALERT_TYPE.WARN
    });
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue([completion]);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--b', {
      b: completion
    });
    service.getDoctors = () => response;

    expect(effects.getDoctors$).toBeObservable(expected);
  });

  it('should return AlertShow, GetVisits and BookVisitSuccess action if bookVisit effect succeeds', () => {
    const payload = { date: '10/07/2019', time: '10:00', userId: '1' };
    const action = new BookVisit(payload);
    const completion = [
      new AlertShow({
        message: 'OK',
        alertType: ALERT_TYPE.SUCCESS
      }),
      new GetVisits(),
      new BookVisitSuccess()
    ];
    const message = 'OK';

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: { message }});
    const expected = cold('--(bcd)', {
      b: completion[0],
      c: completion[1],
      d: completion[2]
    });
    service.bookVisit = () => response;

    expect(effects.bookVisit$).toBeObservable(expected);
  });

  it('should return the "error" actions if bookVisit effect fails', () => {
    const message = 'Error';
    const payload = { date: '10/07/2019', time: '10:00', userId: '1' };
    const action = new BookVisit(payload);
    const completion = [
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      }),
      new GetVisits(),
      new BookVisitFailure()
    ];
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue(completion);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--(bcd)', {
      b: completion[0],
      c: completion[1],
      d: completion[2]
    });
    service.bookVisit = () => response;

    expect(effects.bookVisit$).toBeObservable(expected);
  });
});
