import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as NotificationActions from '../actions/notification.actions';
import { Visit } from '../../visits/models/visit';
import { PatientNotification } from '../models/patient-notification.interface';

export const adapter: EntityAdapter<
  Visit | PatientNotification
> = createEntityAdapter<Visit | PatientNotification>({
  selectId: (notf: Visit | PatientNotification) =>
    notf.id || (notf as PatientNotification).notification.id,
  sortComparer: false
});

export interface State extends EntityState<Visit> {}
export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action: NotificationActions.NotificationActionUnion
): State {
  switch (action.type) {
    case NotificationActions.NotificationActionTypes.GetNotificationsSuccess: {
      return adapter.addMany(action.payload, state);
    }

    case NotificationActions.NotificationActionTypes.GetNotificationsFailure:
    case NotificationActions.NotificationActionTypes.ResetNotifications: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}
