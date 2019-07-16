import { reducer, initialState } from './signup.reducer';
import {
  Signup,
  SignupSuccess,
  SignupFailure
} from '../actions/signup.actions';

describe('Signup Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should make pending to true', () => {
    const signupData = {
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      password: 'test123',
      confirmPassword: 'test123'
    };
    const action = new Signup(signupData);
    const expectedResult = {
      pending: true
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pending to false when SignupSuccess action is disaptch', () => {
    const action = new SignupSuccess();
    const expectedResult = {
      pending: false
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pending to false when SignupFailure action is disaptch', () => {
    const action = new SignupFailure();
    const expectedResult = {
      pending: false
    };
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });
});
