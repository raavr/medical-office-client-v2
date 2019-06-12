import { TestBed } from '@angular/core/testing';

import { PasswordService } from './password.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';

describe('PasswordService', () => {
  let service: PasswordService;
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
    service = TestBed.get(PasswordService);
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.put with the specific URL', () => {
    spyOn(httpClient, 'put');
    const passwords = { oldPassword: 'test123', password: 'pass1234', confirmPassword: 'pass1234' };
    service.changePassword(passwords);

    expect(httpClient.put).toHaveBeenCalledWith(
      `${ENDPOINT}/api/change_password`,
      passwords
    );
  });
});
