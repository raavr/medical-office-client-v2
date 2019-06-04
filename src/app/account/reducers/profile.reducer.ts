import * as ProfileActions from '../actions/profile.action';

export interface State {
  pending: boolean;
  id: string;
}

export const initialState: State = {
  pending: false,
  id: null,
}

export function reducer(
  state: State = initialState,
  action: ProfileActions.ProfileActionUnion
) {
  switch(action.type) {
    case ProfileActions.ProfileActionTypes.ProfileGetSuccess: {
      return {
        ...state,
        id: action.payload.sub
      } 
    }

    case ProfileActions.ProfileActionTypes.ProfileGetFailure: {
      return initialState;
    }

    case ProfileActions.ProfileActionTypes.ProfileSave: {
      return {
        ...state,
        pending: true,
      };
    }

    case ProfileActions.ProfileActionTypes.ProfileSaveFailure:
    case ProfileActions.ProfileActionTypes.ProfileSaveSuccess: {
      return {
        ...state,
        pending: false,
      };
    }
    
    default: {
      return state;
    }
  }
}

export const getProfileId = (state: State) => state.id;
export const getProfilePending = (state: State) => state.pending;
