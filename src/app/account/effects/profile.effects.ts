import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ProfileActionTypes,
  ProfileSave,
  ProfileSaveSuccess,
  ProfileSaveFailure,
  ProfileUpdateAvatar,
  ProfileUpdateAvatarSuccess,
  ProfileGetSuccess
} from '../actions/profile.action';
import {
  map,
  exhaustMap,
  catchError,
  switchMap,
} from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}

  @Effect()
  profileSave$ = this.actions$.pipe(
    ofType<ProfileSave>(ProfileActionTypes.ProfileSave),
    map(action => action.payload),
    exhaustMap(payload =>
      this.profileService.updateProfile(payload.newProfile).pipe(
        switchMap(({ message }: any) => [
          new ProfileSaveSuccess({
            id: payload.prevProfile.sub,
            changes: payload.newProfile
          }),
          new AlertShow({ message, alertType: ALERT_TYPE.SUCCESS })
        ]),
        catchError(({ error: { message } }) => [
          new ProfileSaveFailure(message),
          new AlertShow({ message, alertType: ALERT_TYPE.WARN }),
          new ProfileGetSuccess(payload.prevProfile)
        ])
      )
    )
  );

  @Effect()
  profileUpdateAvatar$ = this.actions$.pipe(
    ofType<ProfileUpdateAvatar>(ProfileActionTypes.ProfileUploadAvatar),
    map(action => action.payload),
    exhaustMap(payload =>
      this.profileService.uploadAvatar(payload.avatar).pipe(
        map(
          avatarUrl =>
            new ProfileUpdateAvatarSuccess({
              id: payload.userId,
              changes: { avatar: avatarUrl.avatar_url }
            })
        ),
        catchError(({ error: { message } }) => [
          new AlertShow({ message, alertType: ALERT_TYPE.WARN })
        ])
      )
    )
  );
}
