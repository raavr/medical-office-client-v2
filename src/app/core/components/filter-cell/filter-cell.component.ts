import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-filter-cell',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./filter-cell.component.scss']
})
export class FilterCellComponent {
  _showDoctorCell: boolean;
  @Input()
  get showDoctorCell(): boolean {
    return this._showDoctorCell;
  }
  set showDoctorCell(showDoctorCell: boolean) {
    this._showDoctorCell = showDoctorCell;
    this.isDoctor = showDoctorCell;
  }
  @Input()
  set type(type: string) {
    this.isVisitCell = type === 'visit';
  }
  @HostBinding('class.is-doctor') isDoctor;
  @HostBinding('class.is-visit-cell') isVisitCell;
}
