import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  template: `
    <a mat-list-item [routerLink]="routerLink" (click)="navigate.emit()">
      <mat-icon mat-list-icon>{{ icon }}</mat-icon>
      <span mat-line>
        <ng-content></ng-content>
      </span>
      <span mat-line class="secondary">{{ desc }}</span>
    </a>
  `,
  styles: []
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() desc = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
