import { reducer, initialState } from './book-visit.reducer';
import {
  GetUnavailableDatesSuccess,
  GetUnavailableDatesFailure,
  GetAvailableTimeSuccess,
  GetAvailableTimeFailure,
  GetPatientsByNameSuccess,
  GetPatientsByNameFailure,
  GetDoctorsSuccess,
  GetDoctorsFailure,
  BookVisit,
  BookVisitSuccess,
  BookVisitFailure
} from '../actions/book-visit.action';

describe('Book Visit Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return the state containing disableDates prop when the GetUnavailableDatesSuccess action is dispatched', () => {
    const disabledDates = { disabledDates: ['22/07/2019'] };
    const action = new GetUnavailableDatesSuccess(disabledDates);
    const expectedResult = {
      ...initialState,
      ...disabledDates
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the initial state when the GetUnavailableDatesFailure action is dispatched', () => {
    const action = new GetUnavailableDatesFailure();
    const expectedResult = {
      ...initialState,
      disabledDates: []
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the state containing availableTimes prop when the GetAvailableTimeSuccess action is dispatched', () => {
    const availableTimes = [{ visitTime: '11:30' }, { visitTime: '10:30' }];
    const action = new GetAvailableTimeSuccess(availableTimes);
    const expectedResult = {
      ...initialState,
      availableTimes
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the initial state when the GetAvailableTimeFailure action is dispatched', () => {
    const action = new GetAvailableTimeFailure();
    const expectedResult = {
      ...initialState,
      availableTimes: []
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the state containing patientsByName prop when the GetPatientsByNameSuccess action is dispatched', () => {
    const patients = [
      { name: 'Test', id: '1' },
      { name: 'Testowy', id: '2' }
    ];
    const action = new GetPatientsByNameSuccess(patients);
    const expectedResult = {
      ...initialState,
      patientsByName: patients
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the initial state when the GetPatientsByNameFailure action is dispatched', () => {
    const action = new GetPatientsByNameFailure();
    const expectedResult = {
      ...initialState,
      patientsByName: []
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the state containing doctors prop when the GetDoctorsSuccess action is dispatched', () => {
    const doctors = [{ name: 'Test', id: '1' }, { name: 'Testowy', id: '2' }];
    const action = new GetDoctorsSuccess(doctors);
    const expectedResult = {
      ...initialState,
      doctors
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the initial state when the GetDoctorsFailure action is dispatched', () => {
    const action = new GetDoctorsFailure();
    const expectedResult = {
      ...initialState,
      doctors: []
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the state containing pending prop equals true when the BookVisit action is dispatched', () => {
    const action = new BookVisit({
      date: '15/08/2019',
      time: '10:00',
      userId: '1'
    });
    const expectedResult = {
      ...initialState,
      pending: true
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the state containing pending prop equals false when the BookVisitSuccess action is dispatched', () => {
    const action = new BookVisitSuccess();
    const expectedResult = {
      ...initialState,
      pending: false
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the state containing pending prop equals false when the BookVisitFailure action is dispatched', () => {
    const action = new BookVisitFailure();
    const expectedResult = {
      ...initialState,
      pending: false
    };

    const result = reducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });
});
