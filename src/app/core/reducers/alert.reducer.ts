import { AlertActionUnion, AlertActionTypes } from '../actions/alert.actions';
import { ALERT_TYPE } from '../components/alert/alert-factory.service';

export interface AlertState {
  message: string;
  alertType: null | ALERT_TYPE.SUCCESS | ALERT_TYPE.WARN;
}

export const initialState = {
  message: null,
  alertType: null
};

export function alertReducer(
  state = initialState,
  action: AlertActionUnion
): AlertState {
  switch (action.type) {
    case AlertActionTypes.AlertShow: {
      return {
        ...state,
        message: action.payload.message,
        alertType: action.payload.alertType
      };
    }

    case AlertActionTypes.AlertReset: {
      return {
        ...initialState
      };
    }

    default: {
      return state;
    }
  }
}

export const getMessageAndType = (state: AlertState) => state;
