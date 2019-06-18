import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as fromRoot from '../../../core/reducers';
import * as fromVisits from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { AlertFactoryService } from '../../../core/components/alert/alert-factory.service';
import { Alert } from 'src/app/core/model/alert.interface';
import { Visit } from '../../models/visit';
import { VisitFilter } from '../../models/visit-filter';
import { GetVisits } from '../../actions/visits.action';

@Component({
  selector: 'app-visits',
  template: `
    <h2>Moje wizyty</h2>
    <mat-divider></mat-divider>
    <app-visits-table
      [visits]="visits$ | async"
      [totalItems]="totalItems$ | async"
      [isDoctor]="isDoctor$ | async"
      [pending]="pending$ | async"
      (onFilterChanged)="onFilterChanged($event)"
    ></app-visits-table>
  `,
  styles: []
})
export class VisitsComponent implements OnInit {
  alert$: Observable<Alert>;
  visits$: Observable<Visit[]>;
  totalItems$: Observable<number>;
  isDoctor$: Observable<boolean>;
  pending$: Observable<boolean>;
  private alertUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private alert: AlertFactoryService
  ) {
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
    this.visits$ = store.pipe(select(fromVisits.getVisits));
    this.totalItems$ = store.pipe(select(fromVisits.getTotalItems));
    this.isDoctor$ = store.pipe(select(fromAuth.isDoctor));
    this.pending$ = store.pipe(select(fromVisits.getPending));
  }

  ngOnInit(): void {
    this.alert$
      .pipe(
        takeUntil(this.alertUnsub$),
        filter(payload => !!payload && !!payload.message)
      )
      .subscribe(payload =>
        this.alert.create(payload.message, { type: payload.alertType })
      );
  }

  onFilterChanged(filter: VisitFilter) {
    this.store.dispatch(new GetVisits(filter));
  }

  ngOnDestroy() {
    this.alertUnsub$.next();
    this.alertUnsub$.complete();
  }
}
