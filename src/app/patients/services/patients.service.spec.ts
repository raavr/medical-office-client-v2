import { TestBed } from '@angular/core/testing';
import { PatientsService } from './patients.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';
import { PatientFilter } from '../models/patient-filter';

describe('PatientsService', () => {
  let service: PatientsService;
  let httpClient: HttpClient;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {            
            get: () => {},
            delete: () => {},
          }
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(PatientsService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.get with the specific URL and params', () => {
    spyOn(httpClient, 'get');
    const filters: PatientFilter = { 
      currentPage: 1
    }
    service.getPatients(filters);

    expect(httpClient.get).toHaveBeenCalledWith(
      `${ENDPOINT}/api/patients`,
      { params: filters }
    );
  });

  it('should call httpClient.delete with the specific URL and params', () => {
    spyOn(httpClient, 'delete');
    const user = {
      id: '124',
      name: 'Test'
    };
    service.removePatient(user);

    expect(httpClient.delete).toHaveBeenCalledWith(
      `${ENDPOINT}/api/patients/${user.id}`,
    );
  });

});
