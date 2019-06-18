import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import { VisitFilter } from '../models/visit-filter';
import { VisitsApi } from '../models/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  constructor(private http: HttpClient) {}

  getVisits(filters: VisitFilter = { type: 'current' }) {
    const tranfFilters = { 
      ...filters, 
      numPages: String(filters.numPages),
      currentPage: String(filters.currentPage),
      limit: String(filters.limit),
    };
    return this.http.get(ENDPOINT + '/api/visits', { params: tranfFilters } ) as Observable<VisitsApi>;
  }

  cancelVisit(visitId: string) {
    return this.http.delete(ENDPOINT + '/api/visits', { params: { visitId }}) as Observable<{message: string}>;
  }
}
