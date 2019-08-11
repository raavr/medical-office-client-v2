import * as NotificationAction from '../actions/notification.actions';

export interface State {
  pending: boolean;
  totalItems: number;
  animationPending: boolean;
}

export const initialState: State = {
  pending: false,
  totalItems: 0,
  animationPending: false
};

export function reducer(
  state: State = initialState,
  action: NotificationAction.NotificationActionUnion
) {
  switch (action.type) {
    case NotificationAction.NotificationActionTypes.GetNotifications: {
      return {
        ...state,
        pending: true
      };
    }

    case NotificationAction.NotificationActionTypes.GetNotificationsSuccess:
    case NotificationAction.NotificationActionTypes.GetNotificationsFailure: {
      return {
        ...state,
        pending: false
      };
    }

    case NotificationAction.NotificationActionTypes.RunNotificationAnimation: {
      return {
        ...state,
        animationPending: true
      };
    }

    case NotificationAction.NotificationActionTypes.StopNotificationAnimation: {
      return {
        ...state,
        animationPending: false
      };
    }

    case NotificationAction.NotificationActionTypes.SetNotificationsCounter: {
      return {
        ...state,
        totalItems: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getTotalItems = (state: State) => state.totalItems;
export const getPending = (state: State) => state.pending;
export const getAnimationPending = (state: State) => state.animationPending;
