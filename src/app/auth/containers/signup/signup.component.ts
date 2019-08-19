import { Component } from '@angular/core';
import * as fromAuth from '../../reducers';
import * as SignupActions from '../../actions/signup.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignupData } from '../../models/signup';

@Component({
  selector: 'app-signup',
  template: `
    <app-signup-form
      [pending]="pending$ | async"
      (submitForm)="onSubmit($event)"
      class="flex-center"
      [style.marginTop.px]="20"
    >
    </app-signup-form>
  `,
  styles: []
})
export class SignupComponent {
  pending$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) {
    this.pending$ = this.store.pipe(select(fromAuth.getSignupPending));
  }

  onSubmit(signupData: SignupData) {
    this.store.dispatch(new SignupActions.Signup(signupData));
  }
}
