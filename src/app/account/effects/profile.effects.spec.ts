import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProfileEffects } from './profile.effects';
import { ProfileService } from '../services/profile.service';
import {
  ProfileSave,
  ProfileSaveSuccess,
  ProfileSaveFailure,
  ProfileGetSuccess,
  ProfileUpdateAvatar,
  ProfileUpdateAvatarSuccess
} from '../actions/profile.action';
import { hot, cold } from 'jasmine-marbles';
import { AlertShow } from 'src/app/core/actions/alert.actions';
import { ALERT_TYPE } from 'src/app/core/components/alert/alert-factory.service';
import * as utilFun from '../../core/utils/utils';

describe('ProfileEffects', () => {
  let actions$: Observable<any>;
  let effects: ProfileEffects;
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$),
        {
          provide: ProfileService,
          useValue: {
            updateProfile: () => {},
            uploadAvatar: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(ProfileEffects);
    service = TestBed.get(ProfileService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return the ProfileSaveSuccess action with a changes object and the AlertShow with a message if profileSave effect succeeds', () => {
    const prevProfile = { sub: '1', name: 'Test' };
    const newProfile = { sub: '1', name: 'New' };
    const message = 'OK';

    const action = new ProfileSave({ prevProfile, newProfile });
    const completion = [
      new ProfileSaveSuccess({ id: prevProfile.sub, changes: newProfile }),
      new AlertShow({ message, alertType: ALERT_TYPE.SUCCESS })
    ];

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: { message } });
    const expected = cold('--(bc)', { b: completion[0], c: completion[1] });
    service.updateProfile = () => response;

    expect(effects.profileSave$).toBeObservable(expected);
  });

  it('should return the "error" actions if profileSave effect fails', () => {
    const prevProfile = { sub: '1', name: 'Test' };
    const newProfile = { sub: '1', name: 'New' };
    const message = 'Error';

    const action = new ProfileSave({ prevProfile, newProfile });
    const completion = [
      new ProfileSaveFailure(message),
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      }),
      new ProfileGetSuccess(prevProfile)
    ];
    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue(completion);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--(bcd)', {
      b: completion[0],
      c: completion[1],
      d: completion[2]
    });
    service.updateProfile = () => response;

    expect(effects.profileSave$).toBeObservable(expected);
  });

  it('should return the ProfileUpdateAvatarSuccess action with a changes object if profileUpdateAvatar effect succeeds', () => {
    const avatarDto = { userId: '1', avatar: new FormData() };
    const avatarUrl = { avatar_url: 'http://1/1.jpg' };
    const action = new ProfileUpdateAvatar(avatarDto);
    const completion = new ProfileUpdateAvatarSuccess({
      id: avatarDto.userId,
      changes: { avatar: avatarUrl.avatar_url }
    });

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: avatarUrl });
    const expected = cold('--b', { b: completion });
    service.uploadAvatar = () => response;

    expect(effects.profileUpdateAvatar$).toBeObservable(expected);
  });

  it('should return the AlertShow action with an error message if profileUpdateAvatar effect fails', () => {
    const avatarDto = { userId: '1', avatar: new FormData() };
    const action = new ProfileUpdateAvatar(avatarDto);
    const message = 'Error';
    const completion = new AlertShow({
      message,
      alertType: ALERT_TYPE.WARN
    });

    const funSpy = jasmine
      .createSpy('withUnauthorizeErrorAction')
      .and.returnValue([completion]);
    spyOnProperty(utilFun, 'withUnauthorizeErrorAction', 'get').and.returnValue(
      funSpy
    );

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {}, { error: { message }, status });
    const expected = cold('--b', { b: completion });
    service.uploadAvatar = () => response;

    expect(effects.profileUpdateAvatar$).toBeObservable(expected);
  });
});
