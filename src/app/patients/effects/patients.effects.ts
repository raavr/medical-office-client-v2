import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  exhaustMap,
  catchError,
  switchMap,
  concatMap,
  withLatestFrom,
  map
} from 'rxjs/operators';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import * as PatientsActions from '../actions/patients.action';
import * as AccountsActions from '../../account/actions/accounts.action';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import { PatientsApi } from '../models/patient';
import * as fromPatientsFilter from '../reducers';
import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../core/reducers';
import { Store, Action } from '@ngrx/store';
import { of } from 'rxjs';
import { PatientsService } from '../services/patients.service';
import { PatientFilter } from '../models/patient-filter';
import { User } from 'src/app/auth/models/user';

@Injectable()
export class PatientsEffects {
  constructor(
    private actions$: Actions,
    private patientService: PatientsService,
    private store: Store<fromRoot.State>
  ) {}

  @Effect()
  getPatients$ = this.actions$.pipe(
    ofType<PatientsActions.GetPatients>(
      PatientsActions.PatientsActionTypes.GetPatients
    ),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(
          this.store.select(fromPatientsFilter.getPatientsFilter),
          this.store.select(fromAuth.getUser)
        )
      )
    ),
    exhaustMap((payload: [Action, PatientFilter, User]) =>
      this.patientService.getPatients(payload[1]).pipe(
        switchMap((patientsApi: PatientsApi) => [
          new PatientsActions.ResetPatients(payload[2]), //remove all accounts from the store except the current logged in user
          new AccountsActions.GetAccountsSuccess(patientsApi.patients), //add new patients to the account store
          new PatientsActions.GetPatientsSuccess(patientsApi) //set total patients count
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new PatientsActions.GetPatientsFailure(),
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
  removePatient$ = this.actions$.pipe(
    ofType<PatientsActions.RemovePatient>(
      PatientsActions.PatientsActionTypes.RemovePatient
    ),
    map(action => action.payload),
    exhaustMap((payload: User) =>
      this.patientService.removePatient(payload).pipe(
        switchMap(({ message }) => [
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          }),
          new PatientsActions.RemovePatientSuccess(payload)
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              }),
              new PatientsActions.RemovePatientFailure()
            ],
            status
          )
        )
      )
    )
  );
}
