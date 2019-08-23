import { Component } from '@angular/core';
import * as fromNotifications from '../../../notifications/reducers';
import * as fromProfile from '../../../account/reducers';
import * as fromRoot from '../../../core/reducers';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/auth/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <app-welcome
      [authUser]="authUser$ | async"
      [notificationCounter]="notificationCounter$ | async"
    ></app-welcome>
  `,
})
export class HomeComponent {
  authUser$: Observable<User>;
  notificationCounter$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.authUser$ = store.pipe(select(fromProfile.getProfile));
    this.notificationCounter$ = store.pipe(
      select(fromNotifications.getTotalItems)
    );
  }
}
