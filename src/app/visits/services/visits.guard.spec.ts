import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { VisitsGuard } from './visits.guard';
import * as VisitsActions from '../actions/visits.action';
import * as AuthActions from '../../auth/actions/auth.actions';
import * as fromRoot from '../reducers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { VisitService } from './visits.service';
import { VisitsApi, VisitStatus } from '../models/visit';
import { of, throwError } from 'rxjs';

describe('Auth Guard', () => {
  let guard: VisitsGuard;
  let store: Store<any>;
  let service: VisitService;
  let router: Router;
  let spyService: jasmine.Spy;
  let visitsApi: VisitsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
        }),
        HttpClientTestingModule
      ],
      providers: [
        VisitService,
        {
          provide: Router,
          useValue: { navigate: () => {} }
        }
      ]
    });

    guard = TestBed.get(VisitsGuard);
    store = TestBed.get(Store);
    service = TestBed.get(VisitService);
    router = TestBed.get(Router);
  });

  beforeEach(() => {
    spyOn(store, 'dispatch');
    spyService = spyOn(service, 'getVisits');
    spyOn(router, 'navigate');

    visitsApi = {
      visits: [
        {
          createDate: '2019-08-13T07:30:00.000Z',
          description: 'Zapis',
          id: 124,
          status: VisitStatus.ACCEPTED,
          visitDate: '2019-08-13T08:30:00.000Z'
        }
      ],
      totalItems: 1
    };
  });

  it('should return false if the visit service responds with an error', () => {
    const serviceRes = cold('#', {}, 'Error');
    spyService.and.returnValue(serviceRes);

    const expected = cold('(a|)', { a: false });
    expect(guard.hasVisitsInApi()).toBeObservable(expected);
  });

  it('should return true if the visits service return a valid value', () => {
    const serviceRes = cold('(a|)', { a: visitsApi });
    spyService.and.returnValue(serviceRes);

    const expected = cold('(c|)', { c: true });

    expect(guard.hasVisitsInApi()).toBeObservable(expected);
  });

  it('should return true and dispatch action if the visits service return a valid value', () => {
    const action = new VisitsActions.GetVisitsSuccess(visitsApi);
    spyService.and.returnValue(of(visitsApi));

    guard.hasVisitsInApi().subscribe(activated => {
      expect(activated).toEqual(true);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  it('should return false and dispatch action if the visits service return an error with status 401', done => {
    const action = new AuthActions.Logout();
    spyService.and.returnValue(throwError({ status: 401 }));

    guard.hasVisitsInApi().subscribe(activated => {
      expect(activated).toEqual(false);
      expect(store.dispatch).toHaveBeenCalledWith(action);
      done();
    });
  });

  it('should return false and navigate to "/404" if the visits service return an error with status 403', done => {
    spyService.and.returnValue(throwError({ status: 403 }));

    guard.hasVisitsInApi().subscribe(activated => {
      expect(activated).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/404']);
      done();
    });
  });

  it('should return true if hasVisitsInApi return true', () => {
    spyOn(guard, 'hasVisitsInApi').and.returnValue(of(true));
    guard.canActivateChild().subscribe(inStore => {
      expect(inStore).toBe(true);
    });
  });

  it('should return false if hasVisitsInApi return false', () => {
    spyOn(guard, 'hasVisitsInApi').and.returnValue(of(false));
    guard.canActivateChild().subscribe(inStore => {
      expect(inStore).toBe(false);
    });
  });
});
