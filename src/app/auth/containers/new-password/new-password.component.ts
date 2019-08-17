import { Component } from '@angular/core';
import * as fromAuth from '../../reducers';
import * as ResetPasswordActions from '../../actions/reset-password.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  template: `
    <app-new-password-form
      [pending]="pending$ | async"
      (submitForm)="onSubmit($event)"
      class="flex-center"
      [style.marginTop.px]="72"
    >
    </app-new-password-form>
  `,
  styles: []
})
export class NewPasswordComponent {
  pending$: Observable<boolean>;
  token: string;

  constructor(
    private store: Store<fromAuth.State>,
    private route: ActivatedRoute
  ) {
    this.pending$ = this.store.pipe(select(fromAuth.getNewPasswordPending));
  }

  onSubmit(password: string) {
    this.store.dispatch(
      new ResetPasswordActions.ResetPassword({
        passwordToken: this.token,
        password
      })
    );
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(map(params => params.get('token')))
      .subscribe(token => (this.token = token));
  }
}
