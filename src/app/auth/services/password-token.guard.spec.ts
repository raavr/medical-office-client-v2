import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { PasswordTokenGuard } from './password-token.guard';
import * as fromRoot from '../reducers';
import * as fromAuth from '../reducers';
import { Router } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';
import { of } from 'rxjs';
import { TokenValid } from '../actions/reset-password.actions';

describe('Auth Guard', () => {
  let guard: PasswordTokenGuard;
  let store: Store<fromAuth.State>;
  let router: Router;
  let service: ResetPasswordService;
  const route = {
    paramMap: {
      get: () => 'token'
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
        {
          provide: Router,
          useValue: {
            navigate: () => {}
          }
        },
        {
          provide: ResetPasswordService,
          useValue: {
            checkValidToken: () => of(null)
          }
        }
      ]
    });

    guard = TestBed.get(PasswordTokenGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    service = TestBed.get(ResetPasswordService);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate');
  });

  it('should return true if the token is valid', () => {
    const expected = cold('(a|)', { a: true });
    expect(guard.canActivate(route as any)).toBeObservable(expected);
    expect(store.dispatch).toHaveBeenCalledWith(new TokenValid('token'));
  });

  it('should return false if the token is invalid', () => {
    const expected = cold('(a|)', { a: false });
    const response = cold('#', {}, { });
    service.checkValidToken = () => response;

    expect(guard.canActivate(route as any)).toBeObservable(expected);
    expect(router.navigate).toHaveBeenCalledWith(['/404']);
  });
});
