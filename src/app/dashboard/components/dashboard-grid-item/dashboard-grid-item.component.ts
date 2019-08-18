import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-grid-item',
  template: `
    <a
      [routerLink]="link"
      class="dashboard__grid-item link link--light-primary"
    >
      <mat-card>
        <mat-card-content>
          <ng-content></ng-content>
        </mat-card-content>
      </mat-card>
    </a>
  `,
  styleUrls: ['./dashboard-grid-item.component.scss']
})
export class DashboardGridItemComponent {
  @Input() link: string;
}
