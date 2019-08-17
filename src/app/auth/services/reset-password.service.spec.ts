import { TestBed } from '@angular/core/testing';
import { ResetPasswordService } from './reset-password.service';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from 'src/app/app.constant';

describe('ResetPasswordService', () => {
  let http: HttpClient;
  let service: ResetPasswordService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: HttpClient,
      useValue: { 
        put: () => {},
        get: () => {}
      },
    }]
  }));

  beforeEach(() => {
    service = TestBed.get(ResetPasswordService);
    http = TestBed.get(HttpClient);
    spyOn(http, 'put');
    spyOn(http, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the http.put service with a specific URL when setNewPassword method is called', () => {
    const tokenWithPass = { passwordToken: 'token', password: 'test1234' };
    service.setNewPassword(tokenWithPass);

    expect(http.put).toHaveBeenCalledWith(`${ENDPOINT}/api/reset/${tokenWithPass.passwordToken}`, { password: tokenWithPass.password });
  });

  it('should call the http.get service with a specific URL when checkValidToken method is called', () => {
    const passwordToken = 'token';
    service.checkValidToken(passwordToken);

    expect(http.get).toHaveBeenCalledWith(`${ENDPOINT}/api/reset/${passwordToken}`);
  });

  it('should call the http.put service with a specific URL when resetPassword method is called', () => {
    const email = 'test@example.com';
    service.resetPassword(email);

    expect(http.put).toHaveBeenCalledWith(`${ENDPOINT}/api/reset`, email);
  });
});
