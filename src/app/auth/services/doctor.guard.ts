import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromAuth from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivateChild {
  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  canActivateChild(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.isDoctor),
      map(isDoctor => {
        if (!isDoctor) {
          this.router.navigate(['/404']);
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
