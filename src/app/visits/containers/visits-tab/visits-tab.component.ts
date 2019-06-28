import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, iif, of } from 'rxjs';
import {
  filter,
  takeUntil,
  map,
  mergeMap
} from 'rxjs/operators';
import * as fromRoot from '../../../core/reducers';
import * as fromVisits from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import * as fromVisitsFilter from '../../reducers';
import { AlertFactoryService } from '../../../core/components/alert/alert-factory.service';
import { Alert } from 'src/app/core/model/alert.interface';
import { Visit, VisitType, VisitsStatusUpdateDto } from '../../models/visit';
import { VisitFilter } from '../../models/visit-filter';
import { GetVisits } from '../../actions/visits.action';
import { SetFilter, ResetFilter } from '../../actions/visits-filter.action';
import { ActivatedRoute } from '@angular/router';
import { UpdateStatus } from '../../actions/visits-status.action';

@Component({
  selector: 'app-visits-tab',
  template: `
    <app-visits-table
      [visits]="visits$ | async"
      [totalItems]="totalItems$ | async"
      [isDoctor]="isDoctor$ | async"
      [pending]="pending$ | async"
      [filter]="filter$ | async"
      (onFilterChanged)="onFilterChanged($event)"
      (onVisitsStatusModified)="onVisitsStatusModified($event)"
    ></app-visits-table>
  `,
  styles: []
})
export class VisitsTabComponent implements OnInit {
  alert$: Observable<Alert>;
  visits$: Observable<Visit[]>;
  totalItems$: Observable<number>;
  isDoctor$: Observable<boolean>;
  pending$: Observable<boolean>;
  filter$: Observable<VisitFilter>;
  private alertUnsub$ = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private alert: AlertFactoryService,
    private route: ActivatedRoute
  ) {
    this.alert$ = store.pipe(select(fromRoot.getAlertMessageAndType));
    this.visits$ = store.pipe(select(fromVisits.getVisits));
    this.totalItems$ = store.pipe(select(fromVisits.getTotalItems));
    this.isDoctor$ = store.pipe(select(fromAuth.isDoctor));
    this.pending$ = store.pipe(select(fromVisits.getPending));
    this.filter$ = store.pipe(select(fromVisitsFilter.getVisitsFilter));
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

    this.route.paramMap
      .pipe(
        map(params => params.get('type')),
        mergeMap(type =>
          iif(
            () => Object.values(VisitType).some(accType => accType === type),
            of(type),
            of(VisitType.CURRENT)
          )
        )
      )
      .subscribe(type => this.onTabChanged(type));
  }

  onFilterChanged(filter: VisitFilter) {
    this.store.dispatch(new SetFilter(filter));
    this.store.dispatch(new GetVisits());
  }

  onTabChanged(type) {
    this.store.dispatch(new ResetFilter());
    this.onFilterChanged({ type });
  }

  onVisitsStatusModified(visitsToUpdate: VisitsStatusUpdateDto) {
    this.store.dispatch(new UpdateStatus(visitsToUpdate));
  }

  ngOnDestroy() {
    this.alertUnsub$.next();
    this.alertUnsub$.complete();
  }
}
