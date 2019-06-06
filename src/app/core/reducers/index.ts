import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import * as fromMedia from './media.reducer';
import * as fromAlert from './alert.reducer';

export interface State {
  router: fromRouter.RouterReducerState;
  media: fromMedia.MediaState;
  alert: fromAlert.AlertState;
}

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  media: fromMedia.mediaReducer,
  alert: fromAlert.alertReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export const selectMediaState = createFeatureSelector<
  State,
  fromMedia.MediaState
>('media');

export const getMediaQuery = createSelector(
  selectMediaState,
  fromMedia.getMedia
);

export const selectAlertState = createFeatureSelector<
  State,
  fromAlert.AlertState
>('alert');

export const getAlertMessageAndType = createSelector(
  selectAlertState,
  fromAlert.getMessageAndType
);
