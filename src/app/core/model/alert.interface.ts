import { ALERT_TYPE } from '../components/alert/alert-factory.service';

export interface Alert {
  message: string;
  alertType: ALERT_TYPE;
}
