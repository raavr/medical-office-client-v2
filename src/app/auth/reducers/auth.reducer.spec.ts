import { reducer, initialState, State } from './auth.reducer';
import { Logout, DecodeTokenSuccess } from '../actions/auth.actions';

describe("Auth Reducer", () => {

  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return a user', () => {
    const action = new DecodeTokenSuccess({ sub: '1', name: 'Test', role: 'doctor' });
    const expResult = { user: { sub: '1', name: 'Test', role: 'doctor' } } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should logout a user', () => {
    const action = new Logout();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult)
  });

});