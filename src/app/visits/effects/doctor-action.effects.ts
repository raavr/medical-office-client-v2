import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { exhaustMap, catchError, switchMap, map } from 'rxjs/operators';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import * as VisitsStatusActions from '../actions/visits-status.action';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import { VisitsStatusUpdateDto } from '../models/visit';
import { DoctorActionService } from '../services/doctor-action.service';

@Injectable()
export class DoctorActionEffects {
  constructor(
    private actions$: Actions,
    private doctorActionService: DoctorActionService
  ) {}

  @Effect()
  updateVisitsStatus$ = this.actions$.pipe(
    ofType<VisitsStatusActions.UpdateStatus>(
      VisitsStatusActions.VisitsStatusActionTypes.UpdateStatus
    ),
    map(action => action.payload),
    exhaustMap((payload: VisitsStatusUpdateDto) =>
      this.doctorActionService.updateVisitsStatus(payload).pipe(
        switchMap(({ message }) => [
          new VisitsStatusActions.UpdateStatusSuccess(
            payload.visitsIds.map((id: number) => ({
              id,
              changes: {
                status: payload.status,
                rejectReason: payload.reason
              }
            }))
          ),
          new AlertActions.AlertShow({
            message,
            alertType: ALERT_TYPE.SUCCESS
          })
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
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
}
