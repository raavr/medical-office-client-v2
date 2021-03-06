import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VisitDatetime, VisitTimeOfDay } from '../models/visit-datetime.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getFullVisitSchedule(): Observable<VisitDatetime> {
    return this.http.get(`${ENDPOINT}/api/weekly_times`).pipe(
      map((data: VisitDatetime) => {
        const sunday = data.weeklyVisitTimes.shift();
        return {
          times: data.times,
          weeklyVisitTimes: [...data.weeklyVisitTimes, sunday].filter(
            day => !!day
          ),
          disabledDates: data.disabledDates
        };
      })
    );
  }

  updateVisitTimes(times: string[]) {
    return this.http.put(`${ENDPOINT}/api/visits_times`, {
      times
    }) as Observable<{ message: string }>;
  }

  updateDisabledDates(disabledDates: string[]) {
    return this.http.put(`${ENDPOINT}/api/disabled_dates`, {
      disabledDates
    }) as Observable<{ message: string }>;
  }

  updateWeeklyVisitTimes(weeklyVisitTimes: VisitTimeOfDay[]) {
    return this.http.put(`${ENDPOINT}/api/weekly_times`, {
      weeklyVisitTimes
    }) as Observable<{ message: string }>;
  }
}
