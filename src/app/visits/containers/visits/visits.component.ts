import { Component, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromVisits from '../../reducers';
import * as fromRoot from '../../../core/reducers';
import * as fromAuth from '../../../auth/reducers';
import { delay, takeUntil } from 'rxjs/operators';
import { VisitType } from '../../models/visit';
import { Observable, Subject } from 'rxjs';
import {
  GetAvailableTime,
  GetPatientsByName,
  BookVisit,
  GetUnavailableDates,
  GetDoctors
} from '../../actions/book-visit.action';
import {
  DoctorsDateDto,
  VisitTime,
  VisitReservationDto
} from '../../models/visit-booking';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-visits',
  templateUrl: 'visits.component.html',
  styleUrls: ['../../../core/styles/shared.scss', './visits.component.scss']
})
export class VisitsComponent implements OnDestroy {
  links = [
    { label: 'Aktualne', type: VisitType.CURRENT },
    { label: 'Historyczne', type: VisitType.PAST }
  ];
  activeLink: string;
  bookVisitPending$: Observable<boolean>;
  isDoctor$: Observable<boolean>;
  visitTimes$: Observable<VisitTime[]>;
  patients$: Observable<User[]>;
  doctors$: Observable<User[]>;
  disabledDates$: Observable<string[]>;
  private unsub$ = new Subject<null>();

  constructor(private store: Store<fromRoot.State>) {
    store
      .pipe(
        takeUntil(this.unsub$),
        select(fromVisits.getVisitsFilterType),
        delay(0)
      )
      .subscribe(type => (this.activeLink = type));

    this.bookVisitPending$ = store.pipe(select(fromVisits.getBookVisitPending));
    this.isDoctor$ = store.pipe(select(fromAuth.isDoctor));
    this.visitTimes$ = store.pipe(select(fromVisits.getAvailableTimes));
    this.patients$ = store.pipe(select(fromVisits.getPatientsByName));
    this.doctors$ = store.pipe(select(fromVisits.getDoctors));
    this.disabledDates$ = store.pipe(select(fromVisits.getDisabledDates));
  }

  bookVisit(isDoctor: boolean) {
    this.store.dispatch(
      isDoctor ? new GetUnavailableDates() : new GetDoctors()
    );
  }

  onDialogClosed(result: VisitReservationDto) {
    this.store.dispatch(new BookVisit(result));
  }

  onDateChanged(doctorsDate: DoctorsDateDto) {
    this.store.dispatch(new GetAvailableTime(doctorsDate));
  }

  onPatientNameChanged(name: string) {
    this.store.dispatch(new GetPatientsByName(name));
  }

  onDoctorSelected(doctorId: string) {
    this.store.dispatch(new GetUnavailableDates(doctorId));
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
