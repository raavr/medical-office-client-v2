import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";

import { ScheduleEffects } from "./schedule.effects";
import { ScheduleService } from "../services/schedule.service";

import * as fromRoot from "../../core/reducers";
import * as fromSchedule from "../reducers";
import { hot, cold } from "jasmine-marbles";
import { AlertShow } from "src/app/core/actions/alert.actions";
import { ALERT_TYPE } from "src/app/core/components/alert/alert-factory.service";
import * as utilFun from "../../core/utils/utils";
import { StoreModule, combineReducers, Store } from "@ngrx/store";
import { MockStore } from "@ngrx/store/testing";
import {
  SetVisitTimes,
  GetFullSchedule,
  SetDisabledDates,
  SetWeeklyVisitTimes,
  GetFullScheduleFailure,
  UpdateVisitTimesFailure,
  UpdateVisitTimes,
  UpdateWeeklyVisitTimes,
  UpdateWeeklyVisitTimesFailure
} from "../actions/schedule.action";

describe("ScheduleEffects", () => {
  let actions$: Observable<any>;
  let effects: ScheduleEffects;
  let service: ScheduleService;
  let status: number;
  let store: MockStore<fromSchedule.State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          schedule: combineReducers(fromSchedule.reducers)
        })
      ],
      providers: [
        ScheduleEffects,
        provideMockActions(() => actions$),
        {
          provide: ScheduleService,
          useValue: {
            getFullVisitSchedule: () => {},
            updateVisitTimes: () => {},
            updateDisabledDates: () => {},
            updateWeeklyVisitTimes: () => {}
          }
        }
      ]
    });

    effects = TestBed.get(ScheduleEffects);
    service = TestBed.get(ScheduleService);
    store = TestBed.get(Store);
    status = 401;
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });

  it("should return the SetVisitTimes action, the SetWeeklyVisitTimes action and the SetDisabledDates action with a changes object if getFullSchedule effect succeeds", () => {
    const visitDatetimes = {
      times: ["10:30"],
      weeklyVisitTimes: [
        {
          dayOfWeek: 1,
          visitTime: [{ time: "10:00", selected: true }]
        }
      ],
      disabledDates: ["12/08/2019"]
    };

    const action = new GetFullSchedule();
    const completion = [
      new SetVisitTimes(visitDatetimes.times),
      new SetDisabledDates(visitDatetimes.disabledDates),
      new SetWeeklyVisitTimes(visitDatetimes.weeklyVisitTimes)
    ];

    actions$ = hot("-a---", { a: action });
    const response = cold("-a|", { a: visitDatetimes });
    const expected = cold("--(bcd)", {
      b: completion[0],
      c: completion[1],
      d: completion[2]
    });
    service.getFullVisitSchedule = () => response;

    expect(effects.getFullSchedule$).toBeObservable(expected);
  });

  it('should return the "error" actions if getFullSchedule effect fails', () => {
    const message = "Error";

    const action = new GetFullSchedule();
    const completion = [
      new GetFullScheduleFailure(),
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      })
    ];
    const funSpy = jasmine
      .createSpy("withUnauthorizeErrorAction")
      .and.returnValue(completion);
    spyOnProperty(utilFun, "withUnauthorizeErrorAction", "get").and.returnValue(
      funSpy
    );

    actions$ = hot("-a---", { a: action });
    const response = cold("-#", {}, { error: { message }, status });
    const expected = cold("--(bc)", {
      b: completion[0],
      c: completion[1]
    });
    service.getFullVisitSchedule = () => response;

    expect(effects.getFullSchedule$).toBeObservable(expected);
  });

  it("should return the GetFullSchedule action and the AlertShow action with a changes object if updateVisitTimes effect succeeds", () => {
    const times = ["10:30"];
    const message = "OK";
    const action = new UpdateVisitTimes(times);
    const completion = [
      new GetFullSchedule(false),
      new AlertShow({
        message,
        alertType: ALERT_TYPE.SUCCESS
      })
    ];

    actions$ = hot("-a---", { a: action });
    const response = cold("-a|", { a: { message } });
    const expected = cold("--(bc)", {
      b: completion[0],
      c: completion[1]
    });
    service.updateVisitTimes = () => response;

    expect(effects.updateVisitTimes$).toBeObservable(expected);
  });

  it('should return the "error" actions if updateVisitTimes effect fails', () => {
    const message = "Error";
    const times = ["10:30"];
    const action = new UpdateVisitTimes(times);
    const completion = [
      new UpdateVisitTimesFailure(),
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      })
    ];
    const funSpy = jasmine
      .createSpy("withUnauthorizeErrorAction")
      .and.returnValue(completion);
    spyOnProperty(utilFun, "withUnauthorizeErrorAction", "get").and.returnValue(
      funSpy
    );

    actions$ = hot("-a---", { a: action });
    const response = cold("-#", {}, { error: { message }, status });
    const expected = cold("--(bc)", {
      b: completion[0],
      c: completion[1]
    });
    service.updateVisitTimes = () => response;

    expect(effects.updateVisitTimes$).toBeObservable(expected);
  });

  it("should return the SetWeeklyVisitTimes action and the AlertShow action with a changes object if updateWeeklyTimes effect succeeds", () => {
    const weeklyVisitTimes = [
      {
        dayOfWeek: 1,
        visitTime: [{ time: "10:00", selected: true }]
      }
    ];
    const message = "OK";
    const action = new UpdateWeeklyVisitTimes(weeklyVisitTimes);
    const completion = [
      new SetWeeklyVisitTimes(weeklyVisitTimes),
      new AlertShow({
        message,
        alertType: ALERT_TYPE.SUCCESS
      })
    ];

    actions$ = hot("-a---", { a: action });
    const response = cold("-a|", { a: { message } });
    const expected = cold("--(bc)", {
      b: completion[0],
      c: completion[1]
    });
    service.updateWeeklyVisitTimes = () => response;

    expect(effects.updateWeeklyTimes$).toBeObservable(expected);
  });

  it('should return the "error" actions if updateWeeklyTimes effect fails', () => {
    const message = "Error";
    const weeklyVisitTimes = [
        {
          dayOfWeek: 1,
          visitTime: [{ time: "10:00", selected: true }]
        }
      ];
    const action = new UpdateWeeklyVisitTimes(weeklyVisitTimes);
    const completion = [
      new UpdateWeeklyVisitTimesFailure(),
      new AlertShow({
        message,
        alertType: ALERT_TYPE.WARN
      })
    ];
    const funSpy = jasmine
      .createSpy("withUnauthorizeErrorAction")
      .and.returnValue(completion);
    spyOnProperty(utilFun, "withUnauthorizeErrorAction", "get").and.returnValue(
      funSpy
    );

    actions$ = hot("-a---", { a: action });
    const response = cold("-#", {}, { error: { message }, status });
    const expected = cold("--(bc)", {
      b: completion[0],
      c: completion[1]
    });
    service.updateWeeklyVisitTimes = () => response;

    expect(effects.updateWeeklyTimes$).toBeObservable(expected);
  });
});
