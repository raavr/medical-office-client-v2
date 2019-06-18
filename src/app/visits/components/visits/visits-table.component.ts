import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Visit } from '../../models/visit';
import { SelectionModel } from '@angular/cdk/collections';
import { VisitFilter } from '../../models/visit-filter';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-visits-table',
  templateUrl: './visits-table.component.html',
  styleUrls: ['../../../core/styles/shared.scss', 'visits-table.component.scss']
})
export class VisitsTableComponent implements OnInit {
  @Input() visits: Visit[];
  @Input() totalItems: number;
  @Input() isDoctor: boolean;
  @Input() pending: boolean;
  @Output() onFilterChanged = new EventEmitter<VisitFilter>();

  get displayedColumns(): string[] {
    const columns = ['date', 'time', 'patient', 'status', 'actions'];
    return this.isDoctor ? ['select', ...columns] : columns;
  }

  filter: VisitFilter;
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
    this.filter.currentPage = page.pageIndex + 1;
    this.filter.limit = page.pageSize;
    this.filter.numPages = page.length;

    this.onFilterChanged.emit(this.filter);
  }

  filterChanged() {
    this.onFilterChanged.emit(this.filter);
  }

  checkboxLabel(row: Visit): string {
    return `${
      this.selection.isSelected(row) ? 'deselect' : 'select'
    } row ${row.id + 1}`;
  }

  constructor() {}

  ngOnInit() {
    this.filter = {
      currentPage: 1,
      numPages: this.totalItems,
      limit: 10
    };
  }
}
