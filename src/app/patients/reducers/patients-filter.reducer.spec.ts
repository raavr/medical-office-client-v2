import { reducer, initialState, State } from './patients-filter.reducer';
import { ResetFilter, SetFilter } from '../actions/patients-filter.action';

describe('Patients Filter Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return the initial state when the ResetFilter action is dispatched', () => {
    const action = new ResetFilter();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return the merged state when SetFilter action is dispatched', () => {
    const newFilter = {
      name: 'John Doe',
      email: 'john@example.com',
    };
    const action = new SetFilter(newFilter);

    const expResult = { ...initialState, ...newFilter } as State;
    const state = { pending: false };
    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

});
