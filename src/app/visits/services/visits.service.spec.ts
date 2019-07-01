import { TestBed } from '@angular/core/testing';

import { VisitService } from './visits.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';
import { VisitFilter } from '../models/visit-filter';

describe('VisitService', () => {
  let service: VisitService;
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
    service = TestBed.get(VisitService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.get with the specific URL and params', () => {
    spyOn(httpClient, 'get');
    const filters: VisitFilter = { 
      currentPage: 1
    }
    service.getVisits(filters);

    expect(httpClient.get).toHaveBeenCalledWith(
      `${ENDPOINT}/api/visits`,
      { params: filters }
    );
  });

  it('should call httpClient.delete with the specific URL and params', () => {
    spyOn(httpClient, 'delete');
    const visitId = 1;
    service.cancelVisit(visitId);

    expect(httpClient.delete).toHaveBeenCalledWith(
      `${ENDPOINT}/api/visits`,
      { params: { visitId: String(visitId) } }
    );
  });

});
