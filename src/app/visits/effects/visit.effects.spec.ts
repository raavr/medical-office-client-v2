import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { VisitEffects } from './visit.effects';
import { VisitService } from '../services/visits.service';
import { ResetVisits, GetVisits, GetVisitsSuccess, GetVisitsFailure } from '../actions/visits.action';
import * as fromRoot from '../../core/reducers';
import * as fromVisits from '../reducers';
import { hot, cold } from 'jasmine-marbles';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as utilFun from '../../core/utils/utils';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { VisitType, VisitStatus } from '../models/visit';

describe('VisitEffects', () => {
  let actions$: Observable<any>;
  let effects: VisitEffects;
  let service: VisitService;
  let status: number;
  let store: MockStore<fromVisits.State>;
  const initialState = {
    visits: {
      filter: {
        currentPage: 1,
        date: "",
        limit: 10,
        status: "all",
        time: "",
        type: VisitType.CURRENT,
        userName: ""
      },
    },
  } as fromVisits.State;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          visits: combineReducers(fromVisits.reducers),
        }),
      ],
      providers: [
        VisitEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        {
          provide: VisitService,
          useValue: {
            getVisits: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(VisitEffects);
    service = TestBed.get(VisitService);
    store = TestBed.get(Store);
    status = 401;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return the ResetVisits action and the GetVisitsSuccess action with a changes object if getVisits effect succeeds', () => {
    const visitsApi = {
      visits: [{
        createDate: '2019-08-13T07:30:00.000Z',
        description: 'Zapis',
        id: 124,
        status: VisitStatus.ACCEPTED,
        visitDate: '2019-08-13T08:30:00.000Z'
      }],
      totalItems: 1
    };

    const action = new GetVisits();
    const completion = [
      new ResetVisits(),
      new GetVisitsSuccess(visitsApi)
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: visitsApi });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    service.getVisits = () => response;

    expect(effects.getVisits$).toBeObservable(expected);
  });

  it('should return the "error" actions if getVisits effect fails', () => {
    const message = 'Error';

    const action = new GetVisits();
    const completion = [
      new GetVisitsFailure(),
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
    service.getVisits = () => response;

    expect(effects.getVisits$).toBeObservable(expected);
  });
});
