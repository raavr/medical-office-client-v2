import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpClient: HttpClient;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ 
      provide: HttpClient, 
      useValue: { get: () => {} } 
    }],
  }));

  beforeEach(() => {
    service = TestBed.get(ProfileService);
    httpClient = TestBed.get(HttpClient);
  })
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.get with the specific URL', () => {
    spyOn(httpClient, 'get');
    service.getProfile();

    expect(httpClient.get).toHaveBeenCalledWith(`${ENDPOINT}/api/profile`);
  });
});
