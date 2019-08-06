import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, switchMap, map } from 'rxjs/operators';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import * as CreatePatientActions from '../actions/create-patient.action';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import { User } from '../../auth/models/user';
import { PatientsService } from '../services/patients.service';

@Injectable()
export class CreatePatientEffects {
  constructor(
    private actions$: Actions,
    private patientService: PatientsService
  ) {}

  @Effect()
  createPatient$ = this.actions$.pipe(
    ofType<CreatePatientActions.CreatePatient>(
      CreatePatientActions.CreatePatientActionTypes.CreatePatient
    ),
    map(action => action.payload),
    exhaustMap((payload: User) =>
      this.patientService.createPatient(payload).pipe(
        switchMap(
          (newUser: User) => [
            new AlertActions.AlertShow({
              message: 'Konto pacjenta zostało poprawnie utworzone',
              alertType: ALERT_TYPE.SUCCESS
            }),
            new CreatePatientActions.CreatePatientSuccess(newUser)
          ]
          
          ),
          catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              }),
              new CreatePatientActions.CreatePatientFailure()
            ],
            status
          )
        )
      )
    )
  );
}
