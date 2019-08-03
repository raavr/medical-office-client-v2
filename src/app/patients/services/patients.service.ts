import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import { PatientFilter } from '../models/patient-filter';
import { User } from 'src/app/auth/models/user';
import { PatientsApi } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  getPatients(filters: PatientFilter = {}) {
    return this.http.get(ENDPOINT + '/api/patients', {
      params: filters as HttpParams
    }) as Observable<PatientsApi>;
  }

  removePatient(patient: User) {
    return this.http.delete(
      `${ENDPOINT}/api/patients/${patient.id}`
    ) as Observable<{ message: string }>;
  }
}
