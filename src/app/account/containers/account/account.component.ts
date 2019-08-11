import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { Store, select } from '@ngrx/store';
import * as fromAccount from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { ProfileSave, ProfileUpdateAvatar } from '../../actions/profile.action';
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
export class AccountComponent {
  profile$: Observable<User>;
  profilePending$: Observable<boolean>;
  passwordPending$: Observable<boolean>;

  user: User;

  constructor(private store: Store<fromRoot.State>) {
    this.profile$ = store.pipe(select(fromAccount.getProfile));
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
      new ProfileUpdateAvatar({ userId: this.user.id, avatar })
    );
  }

  onPasswordChanged(passwords: Passwords) {
    this.store.dispatch(new ChangePassword(passwords));
  }
}
