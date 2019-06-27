import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Visit, VisitType } from '../../models/visit';
import { SelectionModel } from '@angular/cdk/collections';
import { VisitFilter } from '../../models/visit-filter';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-visits-table',
  templateUrl: './visits-table.component.html',
  styleUrls: ['../../../core/styles/shared.scss', 'visits-table.component.scss']
})
export class VisitsTableComponent {
  @Input() visits: Visit[];
  @Input() totalItems: number;
  @Input() isDoctor: boolean;
  @Input() pending: boolean;
  @Input() filter: VisitFilter;
  @Output() onFilterChanged = new EventEmitter<VisitFilter>();

  get displayedColumns(): string[] {
    const columns = ['date', 'time', 'patient', 'status', 'actions'];
    return this.isDoctor && this.isCurrentTab ? ['select', ...columns] : columns;
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
      limit: page.pageSize,
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

  constructor() {}

}
