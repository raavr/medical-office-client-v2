import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { map, catchError, tap, switchMap, take } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import * as ProfileActions from '../actions/profile.action';
import * as fromProfile from '../reducers';
import * as fromRoot from '../../core/reducers';
import * as fromAuth from '../../auth/reducers';
import * as AuthActions from 'src/app/auth/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  hasProfileInStore(): Observable<boolean> {
    return combineLatest(
      this.store.pipe(select(fromProfile.getAccountEntities)),
      this.store.pipe(select(fromAuth.getUser))
    ).pipe(
      map(([entities, user]) => entities[user.id]),
      tap(
        profile =>
          profile &&
          this.store.dispatch(new ProfileActions.ProfileGetSuccess(profile))
      ),
      map(profile => !!profile),
      take(1)
    );
  }

  hasProfileInApi(): Observable<boolean> {
    return this.profileService.getProfile().pipe(
      switchMap(profile => this.store.pipe(select(fromAuth.getUser)), (profile, user) => ({...profile, id: user.id})),
      map((profile) => new ProfileActions.ProfileGetSuccess(profile)),
      tap((action: ProfileActions.ProfileGetSuccess) =>
        this.store.dispatch(action)
      ),
      map(profile => !!profile),
      catchError(error => {
        if (error.status === 401) {
          this.store.dispatch(new AuthActions.Logout());
        } else {
          this.router.navigate(['/404']);
        }
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.hasProfileInStore().pipe(
      switchMap(inStore => (inStore ? of(inStore) : this.hasProfileInApi()))
    );
  }
}
