import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Visit } from 'src/app/visits/models/visit';

@Component({
  selector: 'app-notification-item-doctor',
  template: `
    <div mat-menu-item (click)="onNotificationClicked.emit(notification)">
      <app-avatar-img
        [src]="notification?.patient?.avatar"
        [size]="35"
        [style.marginRight.px]="10"
        alt="{{ notification?.patient?.name }} {{ notification?.patient?.surname }}"
      ></app-avatar-img>
      <span
        >{{ notification?.patient?.name }}
        {{ notification?.patient?.surname }} zapisał się na wizytę
        {{ notification?.visitDate | date: 'dd/MM/yyyy' }} o godzinie
        {{ notification?.visitDate | date: 'HH:mm' }}</span
      >
    </div>
  `
})
export class NotificationItemDoctorComponent {
  @Input() notification: Visit;
  @Output() onNotificationClicked = new EventEmitter<Visit>();
}
