import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../core/reducers';
import * as fromSchedule from '../../reducers';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AlertFactoryService } from 'src/app/core/components/alert/alert-factory.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Alert } from 'src/app/core/model/alert.interface';
import {
  GetFullSchedule,
  UpdateVisitTimes
} from '../../actions/schedule.action';

@Component({
  selector: 'app-schedule',
  template: `
    <app-visit-time
      [times]="times$ | async"
      [pending]="timesPending$ | async"
      (update)="updateVisitTimes($event)"
    ></app-visit-time>
  `,
  styles: []
})
export class ScheduleComponent implements OnInit {
  alert$: Observable<Alert>;
  times$: Observable<string[]>;
  timesPending$: Observable<boolean>;
  private alertUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private alert: AlertFactoryService
  ) {
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
    this.times$ = store.pipe(select(fromSchedule.getVisitTimes));
    this.timesPending$ = store.pipe(select(fromSchedule.getPendingVisitTimes));
  }

  updateVisitTimes(times: string[]) {
    this.store.dispatch(new UpdateVisitTimes(times));
  }

  ngOnInit() {
    this.store.dispatch(new GetFullSchedule());
    this.alert$
      .pipe(
        takeUntil(this.alertUnsub$),
        filter(payload => !!payload && !!payload.message)
      )
      .subscribe(payload =>
        this.alert.create(payload.message, { type: payload.alertType })
      );
  }
}
