import { Action } from '@ngrx/store';
import { VisitsStatusUpdateDto, Visit } from '../models/visit';
import { Update } from '@ngrx/entity/src/models';

export enum VisitsStatusActionTypes {
  UpdateStatus = '[Visit Status] Update Visits Status',
  UpdateStatusSuccess = '[Visit Status] Update Visits Success',
}

export class UpdateStatus implements Action {
  readonly type = VisitsStatusActionTypes.UpdateStatus;

  constructor(public payload: VisitsStatusUpdateDto) { }
}

export class UpdateStatusSuccess implements Action {
  readonly type = VisitsStatusActionTypes.UpdateStatusSuccess;

  constructor(public payload: Update<Visit>[]) { }
}

export type VisitsStatusActionUnion = 
  | UpdateStatus
  | UpdateStatusSuccess;