import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import {
  VisitTime,
  VisitReservationDto,
  DisabledDates,
  DoctorsDateDto
} from '../models/visit-booking';
import { User } from 'src/app/auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class BookVisitService {
  constructor(private http: HttpClient) {}

  getUnavailableDates(doctorId?: string) {
    return this.http.get(ENDPOINT + '/api/unavailable_dates', {
      params: doctorId ? { doctorId } : null
    }) as Observable<DisabledDates>;
  }

  getAvailableTimes({ date, doctorId }: DoctorsDateDto) {
    return this.http.get(ENDPOINT + '/api/available_times', {
      params: doctorId ? { date, doctorId } : { date }
    }) as Observable<VisitTime[]>;
  }

  getDoctors() {
    return this.http.get(ENDPOINT + '/api/doctors') as Observable<User[]>;
  }

  bookVisit(reservation: VisitReservationDto) {
    return this.http.post(ENDPOINT + '/api/visits', reservation) as Observable<{
      message: string;
    }>;
  }
}
