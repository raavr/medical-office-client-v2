import { reducer, initialState, State } from './create-patient.reducer';
import {
  CreatePatientSuccess,
  CreatePatientFailure,
  CreatePatient
} from '../actions/create-patient.action';

describe('Create Patients Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return the initial state when the CreatePatientSuccess action is dispatched', () => {
    const user = { id: '1' };
    const action = new CreatePatientSuccess(user);
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return the initial state when the CreatePatientFailure action is dispatched', () => {
    const action = new CreatePatientFailure();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should return the state containing pending prop equals true when the CreatePatient action is dispatch', () => {
    const state = {
      pending: false
    };
    const user = { id: '1' };
    const action = new CreatePatient(user);

    const expResult = { pending: true } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
