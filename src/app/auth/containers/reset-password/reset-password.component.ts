import { Component } from '@angular/core';
import * as fromAuth from '../../reducers';
import * as ResetPasswordActions from '../../actions/reset-password.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  template: `
    <app-reset-password-form
      [pending]="pending$ | async"
      (submitForm)="onSubmit($event)"
      class="flex-center"
      [style.marginTop.px]="72"
    >
    </app-reset-password-form>
  `,
  styles: []
})
export class ResetPasswordComponent {
  pending$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) {
    this.pending$ = this.store.pipe(select(fromAuth.getResetPasswordPending));
  }

  onSubmit(email: string) {
    this.store.dispatch(new ResetPasswordActions.ResetPasswordRequest(email));
  }
}
