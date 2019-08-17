import * as ResetPasswordActions from '../actions/reset-password.actions';

export interface State {
  pendingResetPass: boolean;
  pendingNewPass: boolean;
}

export const initialState: State = {
  pendingResetPass: false,
  pendingNewPass: false
}

export function reducer(state = initialState, action: ResetPasswordActions.ResetPasswordActionUnion): State {
  switch(action.type) {
    case ResetPasswordActions.ResetPasswordActionTypes.ResetPasswordRequest: {
      return {
        ...state,
        pendingResetPass: true,
      }
    }

    case ResetPasswordActions.ResetPasswordActionTypes.ResetPasswordRequestSuccess:
    case ResetPasswordActions.ResetPasswordActionTypes.ResetPasswordRequestFailure: {
      return {
        ...state,
        pendingResetPass: false,
      }
    }

    case ResetPasswordActions.ResetPasswordActionTypes.ResetPassword: {
      return {
        ...state,
        pendingNewPass: true,
      }
    }

    case ResetPasswordActions.ResetPasswordActionTypes.ResetPasswordSuccess:
    case ResetPasswordActions.ResetPasswordActionTypes.ResetPasswordFailure: {
      return {
        ...state,
        pendingNewPass: false,
      }
    }

    default: {
      return state;
    }
  } 
}

export const getResetPassPending = (state: State) => state.pendingResetPass;
export const getNewPassPending = (state: State) => state.pendingNewPass;