import { Action } from '@ngrx/store';
import { PatientFilter } from '../models/patient-filter';

export enum PatientsFilterActionTypes {
  SetFilter = '[Patient Filter] Set Filter Item',
  ResetFilter = '[Patient Filter] Reset Filter'
}

export class SetFilter implements Action {
  readonly type = PatientsFilterActionTypes.SetFilter;

  constructor(public payload: PatientFilter) {}
}

export class ResetFilter implements Action {
  readonly type = PatientsFilterActionTypes.ResetFilter;
}

export type PatientsFilterActionUnion = SetFilter | ResetFilter;
