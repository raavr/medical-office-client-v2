import { reducer, initialState } from './reset-password.reducer';
import {
  ResetPasswordRequest,
  ResetPasswordRequestSuccess,
  ResetPasswordRequestFailure,
  ResetPassword,
  ResetPasswordSuccess,
  ResetPasswordFailure
} from '../actions/reset-password.actions';

describe('Reset Password Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should make pendingResetPass to true', () => {
    const action = new ResetPasswordRequest('test@example.com');
    const expectedResult = {
      pendingResetPass: true,
      pendingNewPass: false
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pendingResetPass to false when ResetPasswordRequestSuccess action is disaptch', () => {
    const action = new ResetPasswordRequestSuccess();
    const initialState = {
      pendingResetPass: true,
      pendingNewPass: false
    };
    const expectedResult = {
      pendingResetPass: false,
      pendingNewPass: false
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pendingResetPass to false when ResetPasswordRequestFailure action is disaptch', () => {
    const action = new ResetPasswordRequestFailure();
    const initialState = {
      pendingResetPass: true,
      pendingNewPass: false
    };
    const expectedResult = {
      pendingResetPass: false,
      pendingNewPass: false
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pendingNewPass to true', () => {
    const action = new ResetPassword({
      passwordToken: 'token',
      password: 'pass1234'
    });
    const expectedResult = {
      pendingResetPass: false,
      pendingNewPass: true
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pendingNewPass to false when ResetPasswordSuccess action is disaptch', () => {
    const action = new ResetPasswordSuccess();
    const initialState = {
      pendingResetPass: false,
      pendingNewPass: true
    };
    const expectedResult = {
      pendingResetPass: false,
      pendingNewPass: false
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pendingNewPass to false when ResetPasswordSuccess action is disaptch', () => {
    const action = new ResetPasswordFailure();
    const initialState = {
      pendingResetPass: false,
      pendingNewPass: true
    };
    const expectedResult = {
      pendingResetPass: false,
      pendingNewPass: false
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });
});
