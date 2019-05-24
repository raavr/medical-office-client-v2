import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../reducers';
import * as AuthActions from '../actions/auth.actions';
import { Credentials } from '../models/user';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import {
  AlertFactoryService,
  ALERT_TYPE
} from '../../core/components/alert/alert-factory.service';

@Component({
  selector: 'app-login',
  template: `
    <app-login-form
      [pending]="pending$ | async"
      (submitForm)="onSubmit($event)"
    >
    </app-login-form>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  pending$ = this.store.pipe(select(fromAuth.getLoginPending));
  error$ = this.store.pipe(select(fromAuth.getLoginError));
  private snackUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromAuth.State>,
    private alertFactory: AlertFactoryService
  ) {}

  onSubmit($event: Credentials) {
    this.store.dispatch(new AuthActions.Login($event));
  }

  ngOnInit() {
    this.error$
      .pipe(
        takeUntil(this.snackUnsub$),
        filter(error => !!error)
      )
      .subscribe(error =>
        this.alertFactory.create(error, { type: ALERT_TYPE.WARN })
      );
  }

  ngOnDestroy() {
    this.snackUnsub$.next();
    this.snackUnsub$.complete();
  }
}
