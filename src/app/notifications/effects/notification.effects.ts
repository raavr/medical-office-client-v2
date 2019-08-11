import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  exhaustMap,
  catchError,
  switchMap,
  map,
  filter,
  delay,
  tap,
  pairwise
} from 'rxjs/operators';
import * as AuthActions from '../../auth/actions/auth.actions';
import * as NotificationActions from '../actions/notification.actions';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import { NotificationService } from '../services/notification.service';
import { Visit } from '../../visits/models/visit';
import { NotificationSocketService } from '../services/notification-socket.service';
import { PatientNotification } from '../models/patient-notification.interface';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
    private notificationSocket: NotificationSocketService
  ) {}

  @Effect()
  getNotification$ = this.actions$.pipe(
    ofType<NotificationActions.GetNotifications>(
      NotificationActions.NotificationActionTypes.GetNotifications
    ),
    exhaustMap(() =>
      this.notificationService.getNotifications().pipe(
        switchMap((notifications: Visit[] | PatientNotification[]) => [
          new NotificationActions.ResetNotifications(),
          new NotificationActions.GetNotificationsSuccess(notifications)
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [new NotificationActions.GetNotificationsFailure()],
            status
          )
        )
      )
    )
  );

  @Effect()
  getNotificationsCounter$ = this.actions$.pipe(
    ofType<NotificationActions.SetNotificationsCounter>(
      NotificationActions.NotificationActionTypes.SetNotificationsCounter
    ),
    map(action => action.payload),
    pairwise(),
    filter(payload => Number(payload[0]) < Number(payload[1])),
    map(() => new NotificationActions.RunNotificationAnimation())
  );

  @Effect()
  runNotificationAnimation$ = this.actions$.pipe(
    ofType<NotificationActions.RunNotificationAnimation>(
      NotificationActions.NotificationActionTypes.RunNotificationAnimation
    ),
    delay(10000),
    map(() => new NotificationActions.StopNotificationAnimation())
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActions.AuthActionTypes.Logout),
    tap(() => this.notificationSocket.disconnect())
  );

  @Effect({ dispatch: false })
  markNotificationAsRead$ = this.actions$.pipe(
    ofType<NotificationActions.MarkAsRead>(
      NotificationActions.NotificationActionTypes.MarkAsRead
    ),
    map(action => action.payload),
    switchMap(payload => this.notificationService.markAsRead(payload))
  );

  @Effect({ dispatch: false })
  markAllNotificationAsRead$ = this.actions$.pipe(
    ofType<NotificationActions.MarkAllAsRead>(
      NotificationActions.NotificationActionTypes.MarkAllAsRead
    ),
    switchMap(() => this.notificationService.markAllAsRead())
  );
}
