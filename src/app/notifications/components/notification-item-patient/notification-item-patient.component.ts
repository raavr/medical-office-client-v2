import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PatientNotification } from '../../models/patient-notification.interface';

@Component({
  selector: 'app-notification-item-patient',
  template: `
    <div mat-menu-item (click)="onNotificationClicked.emit(notification)">
      <img [src]="notification?.doctor?.avatar" class="notifications__avatar" />
      <span
        >Wizyta w dniu
        <span
          [ngClass]="{
            notifications__success:
              notification?.notification?.type === 'success',
            notifications__danger: notification?.notification?.type === 'danger'
          }"
          >{{ notification?.visitDate | date: 'dd/MM/yyyy' }}</span
        >
        o godzinie
        <span
          [ngClass]="{
            notifications__success:
              notification?.notification?.type === 'success',
            notifications__danger: notification?.notification?.type === 'danger'
          }"
          >{{ notification?.visitDate | date: 'HH:mm' }}</span
        >
        została
        <span
          [ngClass]="{
            notifications__success:
              notification?.notification?.type === 'success',
            notifications__danger: notification?.notification?.type === 'danger'
          }"
          >{{ notification?.notification?.type | notificationType }}</span
        >
      </span>
    </div>
  `,
  styles: []
})
export class NotificationItemPatientComponent {
  @Input() notification: PatientNotification;
  @Output() onNotificationClicked = new EventEmitter<PatientNotification>();
}
