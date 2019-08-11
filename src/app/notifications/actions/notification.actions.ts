import { Action } from '@ngrx/store';
import { Visit } from '../../visits/models/visit';
import { PatientNotification } from '../models/patient-notification.interface';

export enum NotificationActionTypes {
  GetNotifications = '[Notification] Get Notifications',
  GetNotificationsSuccess = '[Notification] Get Notifications Success',
  GetNotificationsFailure = '[Notification] Get Notifications Failure',
  SetNotificationsCounter = '[Notification] Set Notifications Counter',
  RunNotificationAnimation = '[Notification] Run Notification Animation',
  StopNotificationAnimation = '[Notification] Stop Notification Animation',
  MarkAsRead = '[Notification] Mark As Read',
  MarkAllAsRead = '[Notification] Mark All As Read',
  ResetNotifications = '[Notification] Reset Notifications'
}

export class GetNotifications implements Action {
  readonly type = NotificationActionTypes.GetNotifications;
}

export class GetNotificationsSuccess implements Action {
  readonly type = NotificationActionTypes.GetNotificationsSuccess;
  
  constructor(public payload: Visit[] | PatientNotification[]) {}
}

export class GetNotificationsFailure implements Action {
  readonly type = NotificationActionTypes.GetNotificationsFailure;
}

export class SetNotificationsCounter implements Action {
  readonly type = NotificationActionTypes.SetNotificationsCounter;
  
  constructor(public payload: number) {}
}
export class ResetNotifications implements Action {
  readonly type = NotificationActionTypes.ResetNotifications;
}

export class RunNotificationAnimation implements Action {
  readonly type = NotificationActionTypes.RunNotificationAnimation;
}

export class StopNotificationAnimation implements Action {
  readonly type = NotificationActionTypes.StopNotificationAnimation;
}

export class MarkAsRead implements Action {
  readonly type = NotificationActionTypes.MarkAsRead;
  
  constructor(public payload: PatientNotification) {}
}

export class MarkAllAsRead implements Action {
  readonly type = NotificationActionTypes.MarkAllAsRead; 
}

export type NotificationActionUnion =
  | GetNotifications
  | GetNotificationsSuccess
  | GetNotificationsFailure
  | ResetNotifications
  | SetNotificationsCounter
  | StopNotificationAnimation
  | RunNotificationAnimation
  | MarkAsRead
  | MarkAllAsRead;
