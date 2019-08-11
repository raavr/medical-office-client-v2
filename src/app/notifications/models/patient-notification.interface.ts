import { Visit } from 'src/app/visits/models/visit';

interface Notification {
  id: number;
  status: 'read' | 'unread';
  type: 'success' | 'danger';
}

export interface PatientNotification extends Visit {
  notification: Notification;
}
