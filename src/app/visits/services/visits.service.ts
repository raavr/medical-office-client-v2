import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import { VisitFilter } from '../models/visit-filter';
import { VisitsApi, Visit } from '../models/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  constructor(private http: HttpClient) {}

  getVisits(filters: VisitFilter = {}) {
    return this.http.get(ENDPOINT + '/api/visits', {
      params: filters as HttpParams
    }) as Observable<VisitsApi>;
  }

  cancelVisit(visit: Visit) {
    return this.http.delete(
      `${ENDPOINT}/api/visits/${visit.id}`
    ) as Observable<{ message: string }>;
  }
}
