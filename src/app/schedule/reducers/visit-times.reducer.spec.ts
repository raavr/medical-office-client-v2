import { reducer, initialState, State } from "./visit-times.reducer";
import {
  ResetFullSchedule,
  UpdateVisitTimes,
  GetFullSchedule,
  SetVisitTimes,
  UpdateVisitTimesFailure
} from "../actions/schedule.action";

describe("VisitTimesReducer", () => {
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

  it("should return the state containing pending prop equals true when the UpdateVisitTimes action is dispatch", () => {
    const state = {
      pending: false,
      times: []
    };
    const action = new UpdateVisitTimes([]);

    const expResult = { pending: true, times: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return the state containing pending prop equals true when the GetFullSchedule action is dispatch", () => {
    const state = {
      pending: false,
      times: []
    };
    const action = new GetFullSchedule();

    const expResult = { pending: true, times: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return new state containing times prop and pending prop equals false", () => {
    const state = {
      pending: true,
      times: []
    };
    const times = ["11:00"];
    const action = new SetVisitTimes(times);

    const expResult = { pending: false, times } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return the state containing pending prop equals false when the UpdateDisabledDatesFailure action is dispatch", () => {
    const state = {
      pending: true,
      times: []
    };
    const action = new UpdateVisitTimesFailure();

    const expResult = { pending: false, times: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
