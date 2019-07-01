import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VisitStatus } from '../../models/visit';

@Component({
  selector: 'app-doctor-action',
  template: `
    <div class="visits__row">
      <button
        mat-raised-button
        color="accent"
        (click)="modifyVisitsStatus.emit(STATUSES.ACCEPTED)"
        [disabled]="!anyRowHasValue"
        [style.marginRight.px]="8"
      >
        Zaakceptuj wizyty
      </button>
      <button
        mat-raised-button
        color="primary"
        (click)="modifyVisitsStatus.emit(STATUSES.CANCELED)"
        [disabled]="!anyRowHasValue"
      >
        Odwołaj wizyty
      </button>
    </div>
  `
})
export class DoctorActionComponent {
  @Input() anyRowHasValue: boolean;
  @Output() modifyVisitsStatus = new EventEmitter<VisitStatus>();
  STATUSES = VisitStatus;
}
