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
    }
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pending to false when LoginSuccess action is disaptch', () => {
    const action = new LoginSuccess({ token: 'some_token' });
    const expectedResult = {
      pending: false,
    }
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should make pending to false when LoginFailure action is disaptch', () => {
    const action = new LoginFailure();
    const expectedResult = {
      pending: false,
    }
    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

});