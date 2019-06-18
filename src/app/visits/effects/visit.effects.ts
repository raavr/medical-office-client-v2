import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import * as AlertActions from 'src/app/core/actions/alert.actions';
import * as VisitsActions from '../actions/visits.action';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import { withUnauthorizeErrorAction } from 'src/app/core/utils/utils';
import { VisitService } from '../services/visits.service';
import { VisitsApi } from '../models/visit';

@Injectable()
export class VisitEffects {
  constructor(
    private actions$: Actions,
    private visitService: VisitService
  ) {}

  @Effect()
  getVisits$ = this.actions$.pipe(
    ofType<VisitsActions.GetVisits>(
      VisitsActions.VisitsActionTypes.GetVisits
    ),
    map(action => action.payload),
    exhaustMap(payload =>
      this.visitService.getVisits(payload).pipe(
        switchMap((visitsApi: VisitsApi) => [
          new VisitsActions.ResetVisits(),
          new VisitsActions.GetVisitsSuccess(visitsApi)
        ]),
        catchError(({ error: { message }, status }) =>
          withUnauthorizeErrorAction(
            [
              new VisitsActions.GetVisitsFailure(),
              new AlertActions.AlertShow({
                message,
                alertType: ALERT_TYPE.WARN
              }),
            ],
            status
          )
        )
      )
    )
  );

  
}
