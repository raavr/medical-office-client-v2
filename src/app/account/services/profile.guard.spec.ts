import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import * as ProfileActions from '../actions/profile.action';
import * as fromRoot from '../reducers';
import * as fromProfile from '../reducers';
import { ProfileGuard } from './profile.guard';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import * as AuthActions from '../../auth/actions/auth.actions';

describe('Profile Guard', () => {
  let guard: ProfileGuard;
  let store: Store<any>;
  let service: ProfileService;
  let router: Router;
  let spyService: jasmine.Spy;
  let storePipeSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          profile: combineReducers(fromProfile.reducers),
        }),
        HttpClientTestingModule
      ],
      providers: [
        ProfileService,
        {
          provide: Router,
          useValue: { navigate: () => {} },
        },
      ]
    });

    store = TestBed.get(Store);
    guard = TestBed.get(ProfileGuard);
    service = TestBed.get(ProfileService);
    router = TestBed.get(Router);
  });
  
  beforeEach(() => {
    spyOn(store, 'dispatch');
    storePipeSpy = spyOn(store, 'pipe');
    spyService = spyOn(service, 'getProfile');
    spyOn(router, 'navigate');
  });

  it('should return false if the profile service responds with an error', () => {
    const serviceRes = cold('#', {}, 'Error'); 
    spyService.and.returnValue(serviceRes);
    
    const expected = cold('(a|)', { a: false });
    expect(guard.hasProfileInApi()).toBeObservable(expected);
  });
  
  it('should return true if the profile service return a valid value', () => {
    const user: any = {};
    const serviceRes = cold('(a|)', { a: user });
    spyService.and.returnValue(serviceRes);
    
    const currentUser = cold('(b|)', { b: { sub: '1' }});
    storePipeSpy.and.returnValue(currentUser);

    const expected = cold('(c|)', { c: true });

    expect(guard.hasProfileInApi()).toBeObservable(expected);
  });
  
  it('should return true and dispatch action if the profile service return a valid value', () => {
    const user: any = { sub: '1' };
    const action = new ProfileActions.ProfileGetSuccess(user);
    spyService.and.returnValue(of(user));
    
    const currentUser = cold('(b|)', { b: user });
    storePipeSpy.and.returnValue(currentUser);

    guard.hasProfileInApi().subscribe((activated) => {
      expect(activated).toEqual(true);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  it('should return false and dispatch action if the profile service return an error with status 401', (done) => {
    const action = new AuthActions.Logout();
    spyService.and.returnValue(throwError({ status: 401 }));
    
    guard.hasProfileInApi().subscribe((activated) => {
      expect(activated).toEqual(false);
      expect(store.dispatch).toHaveBeenCalledWith(action);
      done();
    });
  });

  it('should return false and navigate to "/404" if the profile service return an error with status 403', (done) => {
    spyService.and.returnValue(throwError({ status: 403 }));
    
    guard.hasProfileInApi().subscribe((activated) => {
      expect(activated).toEqual(false);
      expect(router.navigate).toHaveBeenCalledWith(['/404']);
      done();
    });
  });

  it('should return true if hasProfileInStore return true', () => {
    spyOn(guard, 'hasProfileInStore').and.returnValue(of(true));
    guard.canActivate().subscribe((inStore) => {
      expect(inStore).toBe(true);
    })
  });

  it('should call hasProfileInApi if hasProfileInStore return false', (done) => {
    spyOn(guard, 'hasProfileInStore').and.returnValue(of(false));
    spyOn(guard, 'hasProfileInApi').and.returnValue(of(true));

    guard.canActivate().subscribe((activated) => {
      expect(guard.hasProfileInApi).toHaveBeenCalled();
      expect(activated).toBe(true);
      done();
    })
  });
});
