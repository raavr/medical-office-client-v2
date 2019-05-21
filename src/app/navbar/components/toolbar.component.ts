import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="openSidenav.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent {
  @Output() openSidenav = new EventEmitter();
}
