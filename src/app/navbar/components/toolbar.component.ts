import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <button *ngIf="showMenu" mat-icon-button (click)="toggleSidenav()">
          <mat-icon>menu</mat-icon>
        </button>
        <a class="link link--light-primary" routerLink="/">eGabinet</a>
        <span class="toolbar-spacer"></span>
        <ng-content></ng-content>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: []
})
export class ToolbarComponent {
  @Input() opened: Boolean;
  @Input() showMenu: Boolean;
  @Output() openSidenav = new EventEmitter();
  @Output() closeSidenav = new EventEmitter();

  toggleSidenav() {
    this.opened ? this.closeSidenav.emit() : this.openSidenav.emit();
  }
}
