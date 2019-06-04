import { reducer, initialState, State } from './profile.reducer';
import { ProfileGetFailure, ProfileGetSuccess } from '../actions/profile.action';

describe("Profile Reducer", () => {

  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return a user profile', () => {
    const action = new ProfileGetSuccess({ sub: '1', name: 'Test', email: 'test@example.com' });
    const expResult = { id: '1', pending: false } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should return the initial state when the ProfileFailure action is dispatched', () => {
    const action = new ProfileGetFailure();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult)
  });

});