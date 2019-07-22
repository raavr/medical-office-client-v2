import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { Store, select } from '@ngrx/store';
import * as fromAccount from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { ProfileSave, ProfileUpdateAvatar } from '../../actions/profile.action';
import { filter, takeUntil } from 'rxjs/operators';
import { Alert } from 'src/app/core/model/alert.interface';
import { Passwords } from '../../model/passwords';
import { ChangePassword } from '../../actions/password.action';

@Component({
  selector: 'app-account',
  template: `
    <h2>Moje konto</h2>
    <mat-divider></mat-divider>
    <div class="container">
      <div class="flex flex-md-wrap flex-justify" [style.marginTop.px]="20">
        <app-profile
          [profile]="profile$ | async"
          [pending]="profilePending$ | async"
          (onProfileSaved)="onProfileSaved($event)"
          (onAvatarChanged)="onAvatarChanged($event)"
          class="flex flex-100 flex-sm-80 flex-md-50"
        ></app-profile>
        <app-change-password
          [pending]="passwordPending$ | async"
          (onPasswordChanged)="onPasswordChanged($event)"
          class="flex flex-100 flex-sm-80 flex-md-50"
        ></app-change-password>
      </div>
    </div>
  `
})
export class AccountComponent implements OnInit, OnDestroy {
  profile$: Observable<User>;
  alert$: Observable<Alert>;
  profilePending$: Observable<boolean>;
  passwordPending$: Observable<boolean>;

  user: User;
  private alertUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private alert: AlertFactoryService
  ) {
    this.profile$ = store.pipe(select(fromAccount.getProfile));
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
    this.profilePending$ = store.pipe(select(fromAccount.getProfilePending));
    this.passwordPending$ = store.pipe(select(fromAccount.getPasswordPending));
    store.pipe(select(fromAuth.getUser)).subscribe(user => (this.user = user));
  }

  onProfileSaved(newProfile: User) {
    this.store.dispatch(
      new ProfileSave({ prevProfile: this.user, newProfile })
    );
  }

  onAvatarChanged(avatar: FormData) {
    this.store.dispatch(
      new ProfileUpdateAvatar({ userId: this.user.sub, avatar })
    );
  }

  onPasswordChanged(passwords: Passwords) {
    this.store.dispatch(new ChangePassword(passwords));
  }

  ngOnInit(): void {
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
