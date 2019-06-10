import { Component, Input } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-menu',
  template: `
    <button mat-button [matMenuTriggerFor]="menu" class="menu__button">
      <img
        *ngIf="avatar"
        [src]="avatar"
        class="menu__avatar"
      />
      <mat-icon>arrow_drop_down</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <ng-content></ng-content>
    </mat-menu>
  `,
  styles: [
    `
      .menu__button {
        padding: 0;
      }

      .menu__avatar {
        width: 40px;
        height: 40px;
      }
    `
  ]
})
export class MenuComponent {
  @Input() avatar: string;
}
