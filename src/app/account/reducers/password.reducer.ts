import * as PasswordActions from '../actions/password.action';

export interface State {
  pending: boolean;
}

export const initialState: State = {
  pending: false
};

export function reducer(
  state: State = initialState,
  action: PasswordActions.PasswordActionUnion
) {
  switch (action.type) {
    case PasswordActions.PasswordActionTypes.ChangePassword: {
      return {
        pending: true
      };
    }

    case PasswordActions.PasswordActionTypes.ChangePasswordSuccess:
    case PasswordActions.PasswordActionTypes.ChangePasswordFailure: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getPasswordPending = (state: State) => state.pending;
