import { reducer, initialState, State } from './password.reducer';
import {
  ChangePassword,
  ChangePasswordFailure,
  ChangePasswordSuccess
} from '../actions/password.action';

describe('Password Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return the initial state when the ChangePasswordFailure action is dispatched', () => {
    const action = new ChangePasswordFailure();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult);
  });

  it('should return the state with pending equals true', () => {
    const passwords = {
      oldPassword: 'test123',
      password: 'pass123',
      confirmPassword: 'pass123'
    };
    const action = new ChangePassword(passwords);

    const expResult = { pending: true } as State;
    const state = { pending: false };
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return the state with pending equals false when ChangePasswordSuccess action is dispatched', () => {
    const action = new ChangePasswordSuccess();

    const expResult = { pending: false } as State;
    const state = { pending: true };
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
