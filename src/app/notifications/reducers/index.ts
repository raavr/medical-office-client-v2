import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../core/reducers';
import * as fromNotifications from './notification.reducer';
import * as fromTotalItems from './total-notifications.reducer';

export interface NotificationState {
  notifications: fromNotifications.State;
  totalItems: fromTotalItems.State;
}

export interface State extends fromRoot.State {
  notification: NotificationState;
}

export const reducers: ActionReducerMap<NotificationState> = {
  notifications: fromNotifications.reducer,
  totalItems: fromTotalItems.reducer
};

export const selectNotificationState = createFeatureSelector<
  State,
  NotificationState
>('notification');

export const getNotificationEntitiesState = createSelector(
  selectNotificationState,
  (state: NotificationState) => state.notifications
);

export const {
  selectEntities: getNotificationEntities,
  selectAll: getNotifications
} = fromNotifications.adapter.getSelectors(getNotificationEntitiesState);

export const selectTotalItemsState = createSelector(
  selectNotificationState,
  (state: NotificationState) => state.totalItems
);

export const getTotalItems = createSelector(
  selectTotalItemsState,
  fromTotalItems.getTotalItems
);

export const getPending = createSelector(
  selectTotalItemsState,
  fromTotalItems.getPending
);

export const getAnimationPending = createSelector(
  selectTotalItemsState,
  fromTotalItems.getAnimationPending
);
