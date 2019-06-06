import { withUnauthorizeErrorAction } from './utils';
import { AlertReset } from '../actions/alert.actions';
import { ProfileSaveFailure } from 'src/app/account/actions/profile.action';
import { Logout } from 'src/app/auth/actions/auth.actions';

describe('Util', () => {
  it('should return the same actions as those provided as arguments', () => {
    const status = 404;
    const actions = [new ProfileSaveFailure('error'), new AlertReset()];
    const result = withUnauthorizeErrorAction(actions, status);
    expect(result).toBe(actions);
  });

  it('should return the same actions as those provided as arguments including the Logout action', () => {
    const status = 401;
    const actions = [new ProfileSaveFailure('error'), new AlertReset()];
    const result = withUnauthorizeErrorAction(actions, status);
    expect(result).toEqual([...actions, new Logout()]);
  });
});
