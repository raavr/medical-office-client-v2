import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../core/reducers';
import * as fromPatients from '../../reducers';
import * as fromAccounts from '../../../account/reducers';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PatientFilter } from '../../models/patient-filter';
import { User } from 'src/app/auth/models/user';
import { GetPatients, RemovePatient } from '../../actions/patients.action';
import { SetFilter } from '../../actions/patients-filter.action';
import { CreatePatient } from '../../actions/create-patient.action';

@Component({
  selector: 'app-patients',
  template: `
    <header class="app__header">
      <h2 class="app-title">Lista pacjentów</h2>
      <app-create-patient
        [pending]="createPatientPending$ | async"
        (createPatient)="createPatient($event)"
      ></app-create-patient>
    </header>
    <mat-divider [style.marginBottom.px]="20"></mat-divider>
    <div class="container">
      <app-patients-table
        [patients]="patients$ | async"
        [totalItems]="totalItems$ | async"
        [pending]="pending$ | async"
        [filter]="filter$ | async"
        (onFilterChanged)="onFilterChanged($event)"
        (onPatientRemoved)="onPatientRemoved($event)"
      ></app-patients-table>
    </div>
  `,
  styleUrls: ['../../../core/styles/shared.scss']
})
export class PatientsComponent implements OnInit {
  patients$: Observable<User[]>;
  totalItems$: Observable<number>;
  pending$: Observable<boolean>;
  createPatientPending$: Observable<boolean>;
  filter$: Observable<PatientFilter>;

  constructor(private store: Store<fromRoot.State>) {
    this.patients$ = store.pipe(select(fromAccounts.getPatients));
    this.totalItems$ = store.pipe(select(fromPatients.getTotalItems));
    this.pending$ = store.pipe(select(fromPatients.getPending));
    this.createPatientPending$ = store.pipe(
      select(fromPatients.getCreatePatientPending)
    );
    this.filter$ = store.pipe(select(fromPatients.getPatientsFilter));
  }

  onPatientRemoved(patient: User) {
    this.store.dispatch(new RemovePatient(patient));
  }

  onFilterChanged(filter: PatientFilter) {
    this.store.dispatch(new SetFilter(filter));
    this.store.dispatch(new GetPatients());
  }

  createPatient(result: User) {
    this.store.dispatch(new CreatePatient(result));
  }

  ngOnInit() {
    this.store.dispatch(new GetPatients());
  }
}
