import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import { VisitsStatusUpdateDto } from '../models/visit';

@Injectable({
  providedIn: 'root'
})
export class DoctorActionService {
  constructor(private http: HttpClient) {}

  updateVisitsStatus({
    status,
    visitsIds,
    reason = ''
  }: VisitsStatusUpdateDto) {
    return this.http.put(ENDPOINT + '/api/visits', {
      status,
      visits: visitsIds,
      info: reason
    }) as Observable<{ message: string }>;
  }
}
