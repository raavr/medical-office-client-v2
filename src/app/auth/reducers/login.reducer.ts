import { AuthActionUnion, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  pending: boolean;
  error: string | null;
}

export const initialState: State = {
  pending: false,
  error: null,
}

export function reducer(state = initialState, action: AuthActionUnion): State {
  switch(action.type) {
    case AuthActionTypes.Login: {
      return {
        ...state,
        pending: true,
        error: null
      }
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        pending: false,
        error: null
      }
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        pending: false,
        error: action.payload
      }
    }

    default: {
      return state;
    }
  } 
}

export const getPending = (state: State) => state.pending;
export const getError = (state: State) => state.error;