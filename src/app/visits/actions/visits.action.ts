import { Action } from '@ngrx/store';
import { VisitsApi, Visit } from '../models/visit';

export enum VisitsActionTypes {
  GetVisits = '[Visits] Get Visits',
  GetVisitsSuccess = '[Visits] Get Visits Success',
  GetVisitsFailure = '[Visits] Get Visits Failure',
  ResetVisits = '[Visits] Reset Visits',
  CancelVisit = '[Visits] Cancel Visit',
  CancelVisitSuccess = '[Visits] Cancel Visit Success',
  CancelVisitFailure = '[Visits] Cancel Visit Failure',
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

export class CancelVisit implements Action {
  readonly type = VisitsActionTypes.CancelVisit;

  constructor(public payload: Visit) { }
}

export class CancelVisitSuccess implements Action {
  readonly type = VisitsActionTypes.CancelVisitSuccess;

  constructor(public payload: Visit) { }
}

export type VisitsActionUnion = 
  | GetVisits
  | GetVisitsSuccess
  | GetVisitsFailure
  | ResetVisits
  | CancelVisit
  | CancelVisitSuccess;