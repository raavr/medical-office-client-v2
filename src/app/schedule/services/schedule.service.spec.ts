import { TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';
import { of } from 'rxjs';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let httpClient: HttpClient;
  const visitDatetime = {
    times: [],
    weeklyVisitTimes: [
      { dayOfWeek: 0, visitTime: [] },
      { dayOfWeek: 1, visitTime: [] },
    ],
    disabledDates: [],
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: () => of(visitDatetime),
            put: () => {}
          }
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(ScheduleService);
    httpClient = TestBed.get(HttpClient);
    spyOn(httpClient, 'get').and.callThrough();
    spyOn(httpClient, 'put');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.get with the specific URL when getFullVisitSchedule method is called', () => {
    service.getFullVisitSchedule();

    expect(httpClient.get).toHaveBeenCalledWith(`${ENDPOINT}/api/weekly_times`);
  });

  it('should call httpClient.get with the specific URL when getFullVisitSchedule method is called', () => {
    const expected = {
      times: [],
      weeklyVisitTimes: [
        { dayOfWeek: 1, visitTime: [] },
        { dayOfWeek: 0, visitTime: [] },
      ],
      disabledDates: [],
    };
    service.getFullVisitSchedule().subscribe((data) => {
      expect(data).toEqual(expected);
    })

    expect(httpClient.get).toHaveBeenCalledWith(`${ENDPOINT}/api/weekly_times`);
  });

  it('should call httpClient.put with the specific URL and request params equals null when updateVisitTimes method is called', () => {
    const times = ['10:00', '11:00'];
    service.updateVisitTimes(times);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${ENDPOINT}/api/visits_times`,
      { times }
    );
  });

  it('should call httpClient.put with the specific URL and request params equals null when updateDisabledDates method is called', () => {
    const disabledDates = ['12/08/2019'];
    service.updateDisabledDates(disabledDates);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${ENDPOINT}/api/disabled_dates`,
      { disabledDates }
    );
  });

  it('should call httpClient.put with the specific URL and request params equals null when updateWeeklyVisitTimes method is called', () => {
    const weeklyVisitTimes = [
      {
        dayOfWeek: 0,
        visitTime: [{ time: '10:00', selected: true }]
      }
    ];
    service.updateWeeklyVisitTimes(weeklyVisitTimes);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${ENDPOINT}/api/weekly_times`,
      { weeklyVisitTimes }
    );
  });
});
