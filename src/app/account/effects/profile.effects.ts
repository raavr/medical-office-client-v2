import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ProfileActions from '../actions/profile.action';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { ProfileService } from '../services/profile.service';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import * as AuthActions from 'src/app/auth/actions/auth.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}

  @Effect()
  profileSave$ = this.actions$.pipe(
    ofType<ProfileActions.ProfileSave>(
      ProfileActions.ProfileActionTypes.ProfileSave
    ),
    map(action => action.payload),
    exhaustMap(payload =>
      this.profileService.updateProfile(payload.newProfile).pipe(
        switchMap(({ message }: any) => [
          new ProfileActions.ProfileSaveSuccess({
            id: payload.prevProfile.id,
            changes: payload.newProfile
          }),
          new AlertActions.AlertShow({ message, alertType: ALERT_TYPE.SUCCESS })
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new ProfileActions.ProfileSaveFailure(message),
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              }),
              new ProfileActions.ProfileGetSuccess(payload.prevProfile)
            ],
            status
          )
        )
      )
    )
  );

  @Effect()
  profileUpdateAvatar$ = this.actions$.pipe(
    ofType<ProfileActions.ProfileUpdateAvatar>(
      ProfileActions.ProfileActionTypes.ProfileUploadAvatar
    ),
    map(action => action.payload),
    exhaustMap(payload =>
      this.profileService.uploadAvatar(payload.avatar).pipe(
        map(
          avatarUrl =>
            new ProfileActions.ProfileUpdateAvatarSuccess({
              id: payload.userId,
              changes: { avatar: avatarUrl.avatar_url }
            })
        ),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              })
            ],
            status
          )
        )
      )
    )
  );

  @Effect()
  profileGet$ = this.actions$.pipe(
    ofType<ProfileActions.ProfileGet>(
      ProfileActions.ProfileActionTypes.ProfileGet
    ),
    map(action => action.payload),
    exhaustMap(id =>
      this.profileService.getProfile().pipe(
        map(
          profile => new ProfileActions.ProfileGetSuccess({ id, ...profile })
        ),
        catchError(({ status }) => withUnauthorizeErrorAction([], status))
      )
    )
  );

  @Effect()
  removeProfile$ = this.actions$.pipe(
    ofType<AuthActions.Logout>(AuthActions.AuthActionTypes.Logout),
    map(() => new ProfileActions.ProfileGetFailure())
  );
}
