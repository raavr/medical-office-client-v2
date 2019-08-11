import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as AuthActions from '../../actions/auth.actions';
import { Credentials } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <app-login-form
      [pending]="pending$ | async"
      (submitForm)="onSubmit($event)"
      class="flex-center"
      [style.marginTop.px]="72"
    >
    </app-login-form>
  `
})
export class LoginComponent {
  pending$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) {
    this.pending$ = this.store.pipe(select(fromAuth.getLoginPending));
  }

  onSubmit($event: Credentials) {
    this.store.dispatch(new AuthActions.Login($event));
  }
}
