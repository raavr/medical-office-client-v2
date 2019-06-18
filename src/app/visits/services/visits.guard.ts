import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { map, catchError, tap, switchMap, take } from 'rxjs/operators';
import * as VisitsActions from '../actions/visits.action';
import * as fromRoot from '../../core/reducers';
import * as AuthActions from 'src/app/auth/actions/auth.actions';
import { VisitService } from './visits.service';

@Injectable({
  providedIn: 'root'
})
export class VisitsGuard implements CanActivateChild {
  constructor(
    private visitService: VisitService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  hasVisitsInApi(): Observable<boolean> {
    return this.visitService.getVisits().pipe(
      map(visitsApi => new VisitsActions.GetVisitsSuccess(visitsApi)),
      tap(action => this.store.dispatch(action)),
      map(_ => true),
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

  canActivateChild(): Observable<boolean> {
    return this.hasVisitsInApi();
  }
}
