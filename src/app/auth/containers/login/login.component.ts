import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import * as AuthActions from '../../actions/auth.actions';
import { Credentials } from '../../models/user';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { AlertFactoryService } from '../../../core/components/alert/alert-factory.service';
import { Alert } from '../../../core/model/alert.interface';

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
export class LoginComponent implements OnInit, OnDestroy {
  pending$: Observable<boolean>;
  alert$: Observable<Alert>;
  private alertUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromAuth.State>,
    private alert: AlertFactoryService
  ) {
    this.pending$ = this.store.pipe(select(fromAuth.getLoginPending));
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
  }

  onSubmit($event: Credentials) {
    this.store.dispatch(new AuthActions.Login($event));
  }

  ngOnInit() {
    this.alert$
      .pipe(
        takeUntil(this.alertUnsub$),
        filter(payload => !!payload && !!payload.message)
      )
      .subscribe(payload =>
        this.alert.create(payload.message, { type: payload.alertType })
      );
  }

  ngOnDestroy() {
    this.alertUnsub$.next();
    this.alertUnsub$.complete();
  }
}
