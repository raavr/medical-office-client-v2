import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Visit } from 'src/app/visits/models/visit';

@Component({
  selector: 'app-notification-item-doctor',
  template: `
    <div mat-menu-item (click)="onNotificationClicked.emit(notification)">
      <img
        [src]="notification?.patient?.avatar"
        class="notifications__avatar"
      />
      <span
        >{{ notification?.patient?.name }}
        {{ notification?.patient?.surname }} zapisał się na wizytę
        {{ notification?.visitDate | date: 'dd/MM/yyyy' }} o godzinie
        {{ notification?.visitDate | date: 'HH:mm' }}</span
      >
    </div>
  `,
  styles: []
})
export class NotificationItemDoctorComponent {
  @Input() notification: Visit;
  @Output() onNotificationClicked = new EventEmitter<Visit>();
}
