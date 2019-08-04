import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { PatientsEffects } from './patients.effects';
import { PatientsService } from '../services/patients.service';
import * as fromRoot from '../../core/reducers';
import * as fromPatients from '../reducers';
import { hot, cold } from 'jasmine-marbles';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as utilFun from '../../core/utils/utils';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  GetPatients,
  ResetPatients,
  GetPatientsSuccess,
  GetPatientsFailure,
  RemovePatient,
  RemovePatientSuccess,
  RemovePatientFailure
} from '../actions/patients.action';
import { UserRole } from 'src/app/auth/models/user';
import { GetAccountsSuccess } from 'src/app/account/actions/accounts.action';

describe('PatientsEffects', () => {
  let actions$: Observable<any>;
  let effects: PatientsEffects;
  let service: PatientsService;
  let status: number;
  let store: MockStore<fromPatients.State>;
  const user = { id: '1', role: 'doctor' as UserRole };
  const initialState = {
    patients: {
      filter: {
        currentPage: 1,
        limit: 10,
        name: '',
        email: ''
      }
    },
    auth: {
      session: {
        user
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          visits: combineReducers(fromPatients.reducers)
        })
      ],
      providers: [
        PatientsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: PatientsService,
          useValue: {
            getPatients: () => {},
            removePatient: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(PatientsEffects);
    service = TestBed.get(PatientsService);
    store = TestBed.get(Store);
    status = 401;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return the ResetPatients action, the GetAccountsSuccess action, the GetPatientsSuccess action if getPatients effect succeeds', () => {
    const patientsApi = {
      patients: [
        {
          name: 'Test',
          id: '1'
        },
        {
          name: 'Test 2',
          id: '2'
        }
      ],
      totalItems: 5
    };

    const action = new GetPatients();
    const completion = [
      new ResetPatients(user),
      new GetAccountsSuccess(patientsApi.patients),
      new GetPatientsSuccess(patientsApi)
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: patientsApi });
    const expected = cold('--(bcd)', {
      b: completion[0],
      c: completion[1],
      d: completion[2]
    });
    service.getPatients = () => response;
    expect(effects.getPatients$).toBeObservable(expected);
  });

  it('should return the "error" actions if getVisits effect fails', () => {
    const message = 'Error';

    const action = new GetPatients();
    const completion = [
      new GetPatientsFailure(),
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
    const expected = cold('--(bc)', {
      b: completion[0],
      c: completion[1]
    });
    service.getPatients = () => response;

    expect(effects.getPatients$).toBeObservable(expected);
  });

  it('should return the AlertShow action and the RemovePatientSuccess action if removePatient effect succeeds', () => {
    const user = {
      id: '1',
      role: 'doctor' as UserRole
    };

    const message = 'OK';
    const action = new RemovePatient(user);
    const completion = [
      new AlertShow({ message, alertType: ALERT_TYPE.SUCCESS }),
      new RemovePatientSuccess(user)
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: { message } });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    service.removePatient = () => response;

    expect(effects.removePatient$).toBeObservable(expected);
  });

  it('should return the "error" actions if removePatient effect fails', () => {
    const message = 'Error';
    const user = {
      id: '1',
      role: 'doctor' as UserRole
    };
    const action = new RemovePatient(user);
    const completion = [
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      }),
      new RemovePatientFailure()
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
    service.removePatient = () => response;

    expect(effects.removePatient$).toBeObservable(expected);
  });


});
