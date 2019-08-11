import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, combineLatest } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';
import * as fromRoot from '../../../core/reducers';
import * as fromVisits from '../../reducers';
import * as fromAuth from '../../../auth/reducers';
import { Visit, VisitType, VisitsStatusUpdateDto } from '../../models/visit';
import { VisitFilter } from '../../models/visit-filter';
import { GetVisits, CancelVisit } from '../../actions/visits.action';
import { SetFilter, ResetFilter } from '../../actions/visits-filter.action';
import { ActivatedRoute } from '@angular/router';
import { UpdateStatus } from '../../actions/visits-status.action';

@Component({
  selector: 'app-visits-tab',
  template: `
    <div class="container">
      <app-visits-table
        [visits]="visits$ | async"
        [totalItems]="totalItems$ | async"
        [isDoctor]="isDoctor$ | async"
        [pending]="pending$ | async"
        [filter]="filter$ | async"
        (onFilterChanged)="onFilterChanged($event)"
        (onVisitsStatusModified)="onVisitsStatusModified($event)"
        (onVisitCanceled)="onVisitCanceled($event)"
      ></app-visits-table>
    </div>
  `,
  styles: []
})
export class VisitsTabComponent implements OnInit {
  visits$: Observable<Visit[]>;
  totalItems$: Observable<number>;
  isDoctor$: Observable<boolean>;
  pending$: Observable<boolean>;
  filter$: Observable<VisitFilter>;
  private unsub$ = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {
    this.visits$ = store.pipe(select(fromVisits.getVisits));
    this.totalItems$ = store.pipe(select(fromVisits.getTotalItems));
    this.isDoctor$ = store.pipe(select(fromAuth.isDoctor));
    this.pending$ = store.pipe(select(fromVisits.getPending));
    this.filter$ = store.pipe(select(fromVisits.getVisitsFilter));
  }

  ngOnInit(): void {
    combineLatest(this.route.queryParamMap, this.route.paramMap)
      .pipe(
        takeUntil(this.unsub$),
        tap(() => this.store.dispatch(new ResetFilter())),
        map(([queryParamMap, paramMap]) => ({
          userName: queryParamMap.get('name') || '',
          type: Object.values(VisitType).some(
            accType => accType === paramMap.get('type')
          )
            ? (paramMap.get('type') as VisitType)
            : VisitType.CURRENT
        }))
      )
      .subscribe(filter => this.onFilterChanged(filter));
  }
  
  onFilterChanged(filter: VisitFilter) {
    this.store.dispatch(new SetFilter(filter));
    this.store.dispatch(new GetVisits());
  }

  onVisitsStatusModified(visitsToUpdate: VisitsStatusUpdateDto) {
    this.store.dispatch(new UpdateStatus(visitsToUpdate));
  }

  onVisitCanceled(visit: Visit) {
    this.store.dispatch(new CancelVisit(visit));
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
