import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/auth/models/user';
import { PatientFilter } from '../../models/patient-filter';
import { MatDialog, PageEvent } from '@angular/material';
import { filter } from 'rxjs/operators';
import { DialogConfirmationComponent } from 'src/app/core/components/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: [
    '../../../core/styles/shared.scss',
    '../../../core/styles/card_shared.scss',
    '../../../core/styles/table_shared.scss',
  ]
})
export class PatientsTableComponent {
  @Input() patients: User[];
  @Input() totalItems: number;
  @Input() pending: boolean;
  @Input() filter: PatientFilter;
  @Output() onFilterChanged = new EventEmitter<PatientFilter>();
  @Output() onPatientRemoved = new EventEmitter<User>();

  constructor(public dialog: MatDialog) {}

  get displayedColumns(): string[] {
    return['name', 'email',  'actions'];
  }

  changePaginator(page: PageEvent) {
    const filter = {
      currentPage: page.pageIndex + 1,
      limit: page.pageSize
    };

    this.onFilterChanged.emit(filter);
  }

  filterChanged(filter: PatientFilter) {
    this.onFilterChanged.emit(filter);
  }

  removePatient(patient: User) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Czy na pewno chcesz usunąć konto pacjenta?'
      }
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(_ => this.onPatientRemoved.emit(patient));
  }
}
