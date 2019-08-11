import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import { Visit } from '../../visits/models/visit';
import { PatientNotification } from '../models/patient-notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getNotifications() {
    return this.http.get(ENDPOINT + '/api/notifications') as Observable<
      Visit[] | PatientNotification[]
    >;
  }

  markAllAsRead() {
    return this.http.put(`${ENDPOINT}/api/notifications`, {});
  }

  markAsRead(notification: PatientNotification) {
    return this.http.put(`${ENDPOINT}/api/notifications/`, {
      notificationId: notification.notification.id
    });
  }
}
