import { reducer, initialState } from './login.reducer';
import { Login, LoginSuccess, LoginFailure } from '../actions/auth.actions';

describe("Login Reducer", () => {

  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should make pending to true', () => {
    const action = new Login({ email: 'test@example.com', password: 'test' });
    const expectedResult = {
      pending: true,
      error: null
    }
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pending to false and have no error', () => {
    const action = new LoginSuccess({ token: 'some_token' });
    const expectedResult = {
      pending: false,
      error: null
    }
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pending to false and have an error', () => {
    const error = 'Invalid credentials';
    const action = new LoginFailure(error);
    const expectedResult = {
      pending: false,
      error
    }
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

});