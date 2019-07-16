import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromAuth from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import * as SignupActions from '../../actions/signup.actions';
import { select, Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { takeUntil, filter } from 'rxjs/operators';
import { SignupData } from '../../models/signup';
import { Alert } from '../../../core/model/alert.interface';

@Component({
  selector: 'app-signup',
  template: `
    <app-signup-form
      [pending]="pending$ | async"
      (submitForm)="onSubmit($event)"
      class="flex-center"
      [style.marginTop.px]="72"
    >
    </app-signup-form>
  `,
  styles: []
})
export class SignupComponent implements OnInit, OnDestroy {
  pending$: Observable<boolean>
  alert$: Observable<Alert>;
  
  private alertUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromAuth.State>,
    private alert: AlertFactoryService
  ) {
    this.pending$ = this.store.pipe(select(fromAuth.getSignupPending));
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
  }

  onSubmit(signupData: SignupData) {
    this.store.dispatch(new SignupActions.Signup(signupData));
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
