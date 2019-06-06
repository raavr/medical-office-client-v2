import { reducer, initialState, State } from './profile.reducer';
import {
  ProfileGetFailure,
  ProfileGetSuccess,
  ProfileSave,
  ProfileSaveSuccess
} from '../actions/profile.action';

describe('Profile Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return a user profile', () => {
    const action = new ProfileGetSuccess({
      sub: '1',
      name: 'Test',
      email: 'test@example.com'
    });
    const expResult = { id: '1', pending: false } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should return the initial state when the ProfileFailure action is dispatched', () => {
    const action = new ProfileGetFailure();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult);
  });

  it('should return the state with pending equals true', () => {
    const prevProfile = { sub: '1', name: 'Test' };
    const newProfile = { sub: '1', name: 'New Test' };
    const action = new ProfileSave({ prevProfile, newProfile });

    const expResult = { id: '1', pending: true } as State;
    const state = { id: '1', pending: false };
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return the state with pending equals false when ProfileSaveSuccess action is dispatched', () => {
    const action = new ProfileSaveSuccess({
      id: '1',
      changes: { name: 'Test' }
    });

    const expResult = { id: '1', pending: false } as State;
    const state = { id: '1', pending: true };
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
