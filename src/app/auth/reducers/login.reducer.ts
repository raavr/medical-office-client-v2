import { AuthActionUnion, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  pending: boolean;
}

export const initialState: State = {
  pending: false,
}

export function reducer(state = initialState, action: AuthActionUnion): State {
  switch(action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        pending: true,
      }
    }

    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        pending: false,
      }
    }

    default: {
      return state;
    }
  } 
}

export const getPending = (state: State) => state.pending;