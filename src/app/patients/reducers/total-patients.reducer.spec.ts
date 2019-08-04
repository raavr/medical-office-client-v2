import { reducer, initialState, State } from './total-patients.reducer';
import { GetPatientsFailure, ResetPatients, GetPatients, RemovePatient, GetPatientsSuccess, RemovePatientSuccess, RemovePatientFailure } from '../actions/patients.action';

describe('Total Patients Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return the initial state when the GetPatientsFailure action is dispatched', () => {
    const action = new GetPatientsFailure();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult);
  });

  it('should return the initial state when the ResetPatients action is dispatched', () => {
    const action = new ResetPatients({
      id: '1'
    });
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult);
  });

  it('should return the state containing pending prop equals true when the GetPatients action is dispatch', () => {
    const state = {
      pending: false,
      totalItems: 0
    };
    const action = new GetPatients();

    const expResult = { totalItems: 0, pending: true } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return the state containing pending prop equals true when the RemovePatient action is dispatch', () => {
    const state = {
      pending: false,
      totalItems: 0
    };
    const action = new RemovePatient({ id: '1' });

    const expResult = { totalItems: 0, pending: true } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return the state containing pending prop equals false when the RemovePatientFailure action is dispatch', () => {
    const state = {
      pending: true,
      totalItems: 0
    };
    const action = new RemovePatientFailure();

    const expResult = { totalItems: 0, pending: false } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });


  it('should return new state containing totalItems prop and pending prop equals false', () => {
    const state = {
      pending: true,
      totalItems: 0
    };
    const action = new GetPatientsSuccess({
      patients: [
        { id: '1' }
      ],
      totalItems: 1
    });

    const expResult = { pending: false, totalItems: 1 } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return new state containing totalItems prop and pending prop equals false when the RemovePatientSuccess action is dispatch', () => {
    const state = {
      pending: true,
      totalItems: 2
    };
    const action = new RemovePatientSuccess({
      id: '1'
    });

    const expResult = { pending: false, totalItems: 1 } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
