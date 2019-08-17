import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { DoctorGuard } from './doctor.guard';
import * as fromRoot from '../reducers';
import * as fromAuth from '../reducers';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';

describe('Auth Guard', () => {
  let guard: DoctorGuard;
  let store: MockStore<fromAuth.State>;
  let router: Router;
  const initialState = {
    auth: {
      session: {
        user: {
          name: 'Joe',
          surname: 'Doe',
          role: 'user'
        }
      }
    }
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
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: {
            navigate: () => {}
          }
        }
      ]
    });

    guard = TestBed.get(DoctorGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate');
  });

  it('should return false if the user is not doctor', () => {
    const expected = cold('(a|)', { a: false });
    expect(guard.canActivateChild()).toBeObservable(expected);
    expect(router.navigate).toHaveBeenCalledWith(['/404']);
  });

  it('should return true if the user is doctor', () => {
    store.setState({
      auth: {
        session: {
          user: {
            id: '1',
            name: 'Joe',
            surname: 'Doe',
            role: 'doctor'
          }
        }
      }
    } as fromAuth.State);
    const expected = cold('(a|)', { a: true });
    expect(guard.canActivateChild()).toBeObservable(expected);
  });
});
