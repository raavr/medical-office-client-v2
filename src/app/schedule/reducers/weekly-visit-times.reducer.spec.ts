import { reducer, initialState, State } from "./weekly-visit-times.reducer";
import {
  ResetFullSchedule,
  UpdateWeeklyVisitTimes,
  GetFullSchedule,
  SetWeeklyVisitTimes,
  UpdateWeeklyVisitTimesFailure
} from "../actions/schedule.action";

describe("WeeklyVisitTimesReducer", () => {
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

  it("should return the state containing pending prop equals true when the UpdateWeeklyVisitTimes action is dispatch", () => {
    const state = {
      pending: false,
      weeklyVisitTimes: []
    };
    const action = new UpdateWeeklyVisitTimes([]);

    const expResult = { pending: true, weeklyVisitTimes: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return the state containing pending prop equals true when the GetFullSchedule action is dispatch", () => {
    const state = {
      pending: false,
      weeklyVisitTimes: []
    };
    const action = new GetFullSchedule();

    const expResult = { pending: true, weeklyVisitTimes: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return new state containing weeklyVisitTimes prop and pending prop equals false", () => {
    const state = {
      pending: true,
      weeklyVisitTimes: []
    };
    const weeklyVisitTimes = [{ dayOfWeek: 0, visitTime: [] }];
    const action = new SetWeeklyVisitTimes(weeklyVisitTimes);

    const expResult = { pending: false, weeklyVisitTimes } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it("should return the state containing pending prop equals false when the UpdateWeeklyVisitTimesFailure action is dispatch", () => {
    const state = {
      pending: true,
      weeklyVisitTimes: []
    };
    const action = new UpdateWeeklyVisitTimesFailure();

    const expResult = { pending: false, weeklyVisitTimes: [] } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
