import { TestBed } from '@angular/core/testing';

import { VisitService } from './visits.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';
import { VisitFilter } from '../models/visit-filter';
import { VisitStatus } from '../models/visit';

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
    const visit = {
      createDate: '2019-08-13T07:30:00.000Z',
      description: 'Zapis',
      id: 124,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-13T08:30:00.000Z'
    };
    service.cancelVisit(visit);

    expect(httpClient.delete).toHaveBeenCalledWith(
      `${ENDPOINT}/api/visits/${visit.id}`,
    );
  });

});
