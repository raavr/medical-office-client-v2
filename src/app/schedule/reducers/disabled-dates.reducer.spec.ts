import { reducer, initialState, State } from "./disabled-dates.reducer";
import {
  ResetFullSchedule,
  UpdateDisabledDates,
  GetFullSchedule,
  SetDisabledDates,
  UpdateDisabledDatesFailure
} from "../actions/schedule.action";

describe("DisabledDatesReducer", () => {
  it("should return the default state", () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it("should return the initial state when the ResetFullSchedule action is dispatched", () => {
    const action = new ResetFullSchedule();
    const expectedResult = initialState;

    const result = reducer(initialState, action);

    expect(result).toBe(expectedResult);
  });

  it("should return the state containing pending prop equals true when the UpdateDisabledDates action is dispatch", () => {
    const state = {
      pending: false,
      disabledDates: []
    };
    const action = new UpdateDisabledDates([]);

    const expResult = { pending: true, disabledDates: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return the state containing pending prop equals true when the GetFullSchedule action is dispatch", () => {
    const state = {
      pending: false,
      disabledDates: []
    };
    const action = new GetFullSchedule(true);

    const expResult = { pending: true, disabledDates: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return the state containing pending prop equals false when the GetFullSchedule action is dispatch", () => {
    const state = {
      pending: true,
      disabledDates: []
    };
    const action = new GetFullSchedule(false);

    const expResult = { pending: false, disabledDates: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return the state containing pending prop equals false when the GetFullSchedule action is dispatch", () => {
    const state = {
      pending: false,
      disabledDates: []
    };
    const action = new GetFullSchedule();

    const expResult = { pending: true, disabledDates: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return new state containing disabledDates prop and pending prop equals false", () => {
    const state = {
      pending: true,
      disabledDates: []
    };
    const disabledDates = ["12/08/2019"];
    const action = new SetDisabledDates(disabledDates);

    const expResult = { pending: false, disabledDates } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return the state containing pending prop equals false when the UpdateDisabledDatesFailure action is dispatch", () => {
    const state = {
      pending: true,
      disabledDates: []
    };
    const action = new UpdateDisabledDatesFailure();

    const expResult = { pending: false, disabledDates: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
