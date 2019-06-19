import { Component, OnInit, Input } from '@angular/core';
import { VisitStatus } from '../../models/visit';

@Component({
  selector: 'app-visits-status',
  template: `
    <span class="visits__status" [ngClass]="color">
      <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./visits-status.component.scss']
})
export class VisitsStatusComponent implements OnInit {
  @Input() set status(status: VisitStatus) {
    this.color =
      status === VisitStatus.ACCEPTED
        ? 'mat-success'
        : status === VisitStatus.CANCELED
        ? 'mat-warn'
        : 'mat-amber';
  }
  color: string;

  ngOnInit() {}
}
