import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import { VisitFilter } from '../models/visit-filter';
import { VisitsApi } from '../models/visit';

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

  cancelVisit(visitId: number) {
    return this.http.delete(ENDPOINT + '/api/visits', {
      params: { visitId: String(visitId) }
    }) as Observable<{ message: string }>;
  }
}
