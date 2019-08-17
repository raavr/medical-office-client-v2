import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import * as ResetPasswordActions from '../actions/reset-password.actions';
import * as fromRoot from '../../core/reducers';
import { ResetPasswordService } from './reset-password.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordTokenGuard implements CanActivate {
  constructor(
    private resetPasswordService: ResetPasswordService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const passwordToken = route.paramMap.get('token');
    return this.resetPasswordService.checkValidToken(passwordToken).pipe(
      map(() => new ResetPasswordActions.TokenValid(passwordToken)),
      tap(action => this.store.dispatch(action)),
      map(_ => true),
      catchError(_ => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }
}
