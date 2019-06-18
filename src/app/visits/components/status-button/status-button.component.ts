import { Component, OnInit, Input } from '@angular/core';
import { VisitStatus } from '../../models/visit';

@Component({
  selector: 'app-status-button',
  template: `
    <button mat-flat-button color="{{color}}" [style.width.px]="140">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./status-button.component.scss']
})
export class StatusButtonComponent implements OnInit {
  @Input() set status(status: VisitStatus) {
    this.color =
      status === VisitStatus.ACCEPTED
        ? 'success'
        : status === VisitStatus.CANCELED
        ? 'warn'
        : 'amber';
  }
  color: string;

  ngOnInit() {}
}
