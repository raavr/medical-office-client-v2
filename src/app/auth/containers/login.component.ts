import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../reducers';
import * as AuthActions from '../actions/auth.actions';
import { Credentials } from '../models/user';

@Component({
  selector: 'app-login',
  template: `
    <app-login-form 
      [pending]="(pending$ | async)"
      [errorMessage]="(error$ | async)"
      (submitForm)="onSubmit($event)"
    >
    </app-login-form>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  pending$ = this.store.pipe(select(fromAuth.getLoginPending));
  error$ = this.store.pipe(select(fromAuth.getLoginError));
  constructor(private store: Store<fromAuth.State>) { }

  onSubmit($event: Credentials) {
    this.store.dispatch(new AuthActions.Login($event));
  }

}
