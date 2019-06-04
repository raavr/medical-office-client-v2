import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { Store, select } from '@ngrx/store';
import * as fromProfile from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { ProfileSave, ProfileUpdateAvatar } from '../../actions/profile.action';
import { filter, takeUntil } from 'rxjs/operators';
import { Alert } from 'src/app/core/model/alert.interface';

@Component({
  selector: 'app-account',
  template: `
    <app-profile
      [profile]="profile$ | async"
      [pending]="pending$ | async"
      (onProfileSaved)="onProfileSaved($event)"
      (onAvatarChanged)="onAvatarChanged($event)"
    ></app-profile>
  `
})
export class AccountComponent implements OnInit, OnDestroy {
  profile$: Observable<User>;
  alert$: Observable<Alert>;
  pending$: Observable<boolean>;

  user: User;
  private alertUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private alert: AlertFactoryService
  ) {
    this.profile$ = store.pipe(select(fromProfile.getProfile));
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
    this.pending$ = store.pipe(select(fromProfile.getProfilePending));
    store.pipe(select(fromAuth.getUser)).subscribe(user => this.user = user);
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
