import { Action } from '@ngrx/store';
import { User } from 'src/app/auth/models/user';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';

export enum ProfileActionTypes {
  ProfileGetSuccess = '[Profile] Get Profile Success',
  ProfileGetFailure = '[Profile] Get Profile Failure',
  ProfileSave = '[Profile] Save Profile',
  ProfileSaveSuccess = '[Profile] Save Profile Success',
  ProfileSaveFailure = '[Profile] Save Profile Failures',
  ProfileUploadAvatar = '[Profile] Upload Avatar',
  ProfileUploadAvatarFailure = '[Profile] Upload Avatar Failure',
  ProfileUploadAvatarSuccess = '[Profile] Upload Avatar Success',
}

interface ProfileSaveDto {
  prevProfile: User;
  newProfile: User;
}

interface UpdateAvatarDto { 
  userId: string;
  avatar: FormData;
}

export class ProfileGetSuccess implements Action {
  readonly type = ProfileActionTypes.ProfileGetSuccess

  constructor(public payload: User) { }
}

export class ProfileGetFailure implements Action {
  readonly type = ProfileActionTypes.ProfileGetFailure;
}

export class ProfileSave implements Action {
  readonly type = ProfileActionTypes.ProfileSave

  constructor(public payload: ProfileSaveDto) { }
}

export class ProfileSaveSuccess implements Action {
  readonly type = ProfileActionTypes.ProfileSaveSuccess

  constructor(public payload: Update<User>) { }
}

export class ProfileSaveFailure implements Action {
  readonly type = ProfileActionTypes.ProfileSaveFailure;

  constructor(public payload: string) { }
}

export class ProfileUpdateAvatar implements Action {
  readonly type = ProfileActionTypes.ProfileUploadAvatar;

  constructor(public payload: UpdateAvatarDto) { }
}

export class ProfileUpdateAvatarFailure implements Action {
  readonly type = ProfileActionTypes.ProfileUploadAvatarFailure;

  constructor(public payload: string) { }
}

export class ProfileUpdateAvatarSuccess implements Action {
  readonly type = ProfileActionTypes.ProfileUploadAvatarSuccess;

  constructor(public payload: Update<User>) { }
}

export type ProfileActionUnion = 
  | ProfileGetSuccess
  | ProfileGetFailure
  | ProfileSave
  | ProfileSaveSuccess
  | ProfileSaveFailure
  | ProfileUpdateAvatar
  | ProfileUpdateAvatarSuccess
  | ProfileUpdateAvatarFailure;