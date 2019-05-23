import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';

describe('AuthService', () => {
  let http: HttpClient;
  let service: AuthService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: HttpClient,
      useValue: { post: () => {} },
    }]
  }));

  beforeEach(() => {
    service = TestBed.get(AuthService);
    http = TestBed.get(HttpClient);
    spyOn(http, 'post');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the http service with a specific URL', () => {
    const credentials = { email: 'test@example.com', password: 'test123' };
    service.login(credentials);

    expect(http.post).toHaveBeenCalledWith(`${ENDPOINT}/auth/login`, credentials);
  });
  
});
