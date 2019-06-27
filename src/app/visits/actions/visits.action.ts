import { Action } from '@ngrx/store';
import { VisitsApi } from '../models/visit';

export enum VisitsActionTypes {
  GetVisits = '[Visits] Get Visits',
  GetVisitsSuccess = '[Visits] Get Visits Success',
  GetVisitsFailure = '[Visits] Get Visits Failure',
  ResetVisits = '[Visits] Reset Visits',
}

export class GetVisits implements Action {
  readonly type = VisitsActionTypes.GetVisits
}

export class GetVisitsSuccess implements Action {
  readonly type = VisitsActionTypes.GetVisitsSuccess

  constructor(public payload: VisitsApi) { }
}

export class GetVisitsFailure implements Action {
  readonly type = VisitsActionTypes.GetVisitsFailure;
}

export class ResetVisits implements Action {
  readonly type = VisitsActionTypes.ResetVisits;
}

export type VisitsActionUnion = 
  | GetVisits
  | GetVisitsSuccess
  | GetVisitsFailure
  | ResetVisits;