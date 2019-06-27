import { Action } from '@ngrx/store';
import { VisitFilter } from '../models/visit-filter';

export enum VisitsFilterActionTypes {
  SetFilter = '[Filter] Set Filter Item',
  ResetFilter = '[Filter] Reset Filter',
}

export class SetFilter implements Action {
  readonly type = VisitsFilterActionTypes.SetFilter

  constructor(public payload: VisitFilter) { }
}

export class ResetFilter implements Action {
  readonly type = VisitsFilterActionTypes.ResetFilter
}

export type VisitsFilterActionUnion = 
  | SetFilter
  | ResetFilter