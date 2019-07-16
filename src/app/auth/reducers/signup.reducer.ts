import { SignupActionTypes, SignupActionUnion } from '../actions/signup.actions';

export interface State {
  pending: boolean;
}

export const initialState: State = {
  pending: false,
}

export function reducer(state = initialState, action: SignupActionUnion): State {
  switch(action.type) {
    case SignupActionTypes.Signup: {
      return {
        pending: true,
      }
    }

    case SignupActionTypes.SignupSuccess: 
    case SignupActionTypes.SignupFailure: {
      return {
        pending: false,
      }
    }

    default: {
      return state;
    }
  } 
}

export const getPending = (state: State) => state.pending;