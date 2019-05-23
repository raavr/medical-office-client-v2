import { Component } from '@angular/core';
import * as fromAuth from '../auth/reducers';
import * as fromRoot from '../core/reducers';
import { Store, select } from '@ngrx/store';
import { User } from 'src/app/auth/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <p>Hi, {{(authUser$ | async).role}}. What do you want to do today?</p>
  `
})
export class HomeComponent {
  authUser$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {
    this.authUser$ = store.pipe(select(fromAuth.getUser));
  }

}
