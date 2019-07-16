import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import {
  Visit,
  VisitType,
  VisitStatus,
  VisitsStatusUpdateDto
} from '../../models/visit';
import { SelectionModel } from '@angular/cdk/collections';
import { VisitFilter } from '../../models/visit-filter';
import { PageEvent, MatDialog } from '@angular/material';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { filter } from 'rxjs/operators';
import { DialogVisitMoreComponent } from '../dialog-visit-more/dialog-visit-more.component';

@Component({
  selector: 'app-visits-table',
  templateUrl: './visits-table.component.html',
  styleUrls: [
    '../../../core/styles/shared.scss',
    '../../../core/styles/card_shared.scss',
    'visits-table.component.scss'
  ]
})
export class VisitsTableComponent {
  @Input() visits: Visit[];
  @Input() totalItems: number;
  @Input() isDoctor: boolean;
  @Input() pending: boolean;
  @Input() filter: VisitFilter;
  @Output() onFilterChanged = new EventEmitter<VisitFilter>();
  @Output() onVisitsStatusModified = new EventEmitter<VisitsStatusUpdateDto>();
  @Output() onVisitCanceled = new EventEmitter<Visit>();

  constructor(public dialog: MatDialog) {}

  get displayedColumns(): string[] {
    const columns = ['date', 'time', 'patient', 'status', 'actions'];
    return this.isDoctor && this.isCurrentTab
      ? ['select', ...columns]
      : columns;
  }

  get isCurrentTab(): boolean {
    return this.filter.type === VisitType.CURRENT;
  }

  selection = new SelectionModel<Visit>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.visits.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.visits.forEach(row => this.selection.select(row));
  }

  changePaginator(page: PageEvent) {
    const filter = {
      currentPage: page.pageIndex + 1,
      limit: page.pageSize
    };

    this.onFilterChanged.emit(filter);
  }

  filterChanged(filter: VisitFilter) {
    this.onFilterChanged.emit(filter);
  }

  checkboxLabel(row: Visit): string {
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id + 1}`;
  }

  modifyVisitsStatus(status: VisitStatus) {
    this.onVisitsStatusModified.emit({
      status,
      visitsIds: this.selection.selected.map(v => v.id)
    });
  }

  cancelVisit(visit: Visit) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'rezerwację wizyty'
      }
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(_ => this.onVisitCanceled.emit(visit));
  }

  showMore(visit: Visit) {
    this.dialog.open(DialogVisitMoreComponent, {
      width: '600px',
      data: {
        visit,
        isDoctor: this.isDoctor
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.visits) {
      this.selection.clear();
    }
  }
}
