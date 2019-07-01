import { reducer, initialState, State } from './total-visits.reducer';
import {
  ResetVisits,
  GetVisits,
  GetVisitsSuccess
} from '../actions/visits.action';
import { VisitStatus, VisitType } from '../models/visit';
import { GetVisitsFailure } from '../actions/visits.action';

describe('Total Visits Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return the initial state when the GetVisitsFailure action is dispatched', () => {
    const action = new GetVisitsFailure();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult);
  });

  it('should return the initial state when the ResetVisits action is dispatched', () => {
    const action = new ResetVisits();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult);
  });

  it('should return the state with pending prop equals true', () => {
    const state = {
      pending: false,
      totalItems: 0
    };
    const action = new GetVisits();

    const expResult = { totalItems: 0, pending: true } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return new state with totalItems prop and pending prop equals false', () => {
    const state = {
      pending: true,
      totalItems: 0
    };
    const action = new GetVisitsSuccess({
      visits: [
        {
          createDate: '2019-08-13T07:30:00.000Z',
          description: 'Zapis',
          id: 124,
          status: VisitStatus.ACCEPTED,
          visitDate: '2019-08-13T08:30:00.000Z'
        }
      ],
      totalItems: 1
    });

    const expResult = { pending: false, totalItems: 1 } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
