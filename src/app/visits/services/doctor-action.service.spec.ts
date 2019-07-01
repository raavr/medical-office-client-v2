import { TestBed } from '@angular/core/testing';

import { DoctorActionService } from './doctor-action.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';
import { VisitsStatusUpdateDto, VisitStatus } from '../models/visit';

describe('DoctorActionService', () => {
  let service: DoctorActionService;
  let httpClient: HttpClient;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            put: () => {}
          }
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(DoctorActionService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.put with the specific URL and a request body object', () => {
    spyOn(httpClient, 'put');
    const visitsToUpdate: VisitsStatusUpdateDto = {
      status: VisitStatus.ACCEPTED,
      visitsIds: [1],
      reason: ''
    }
    const expected = {
      status: visitsToUpdate.status,
      visits: visitsToUpdate.visitsIds,
      info: visitsToUpdate.reason
    }
    service.updateVisitsStatus(visitsToUpdate);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${ENDPOINT}/api/visits`,
      expected
    );
  });

});
