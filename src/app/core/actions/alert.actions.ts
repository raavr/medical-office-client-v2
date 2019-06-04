import { Action } from '@ngrx/store';
import { Alert } from '../model/alert.interface';

export enum AlertActionTypes {
  AlertShow = '[Alert] Show Alert',
  AlertReset = '[Alert] Reset Alert'
}

export class AlertShow implements Action {
  readonly type = AlertActionTypes.AlertShow;

  constructor(public payload: Alert) {}
}

export class AlertReset implements Action {
  readonly type = AlertActionTypes.AlertReset;
}

export type AlertActionUnion = AlertShow | AlertReset;
