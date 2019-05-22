import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="toggleSidenav()">
        <mat-icon>menu</mat-icon>
      </button>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent {
  @Input() opened: Boolean;
  @Output() openSidenav = new EventEmitter();
  @Output() closeSidenav = new EventEmitter();

  toggleSidenav() {
    this.opened ? this.closeSidenav.emit() : this.openSidenav.emit();
  }
}
