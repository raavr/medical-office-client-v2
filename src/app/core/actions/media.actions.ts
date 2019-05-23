import { Action } from '@ngrx/store';

export enum MediaActionTypes {
  MediaChanged = '[Media] Change MediaQuery',
}

export class MediaChanged implements Action {
  readonly type = MediaActionTypes.MediaChanged;

  constructor(public payload: { [key: string]: Boolean }) { }
}

export type MediaActionUnion = MediaChanged;