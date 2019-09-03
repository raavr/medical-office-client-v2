import { Component, Input } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-menu',
  template: `
    <button mat-button [matMenuTriggerFor]="menu" class="menu__button">
      <app-avatar-img
        *ngIf="avatar"
        [src]="avatar"
        [size]="40"
      ></app-avatar-img>
      <mat-icon>arrow_drop_down</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <ng-content></ng-content>
    </mat-menu>
  `,
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() avatar: string;
}
