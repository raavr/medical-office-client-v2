import { MediaActionUnion, MediaActionTypes } from '../actions/media.actions';

export interface MediaState {
  [key: string]: Boolean;
}

export function mediaReducer(state = {}, action: MediaActionUnion): MediaState {
  switch (action.type) {
    case MediaActionTypes.MediaChanged: {
      return {
        ...state,
        ...action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export const getMedia = (state: MediaState) => state;
