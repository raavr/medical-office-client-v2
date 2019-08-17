import { Injectable } from '@angular/core';
import { ENDPOINT } from '../../app.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PasswordToken } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  setNewPassword({ passwordToken, password }: PasswordToken) {
    return this.http.put(`${ENDPOINT}/api/reset/${passwordToken}`, {
      password
    }) as Observable<{ message: string }>;
  }

  checkValidToken(passwordToken: string) {
    return this.http.get(
      `${ENDPOINT}/api/reset/${passwordToken}`
    ) as Observable<{ message: string }>;
  }

  resetPassword(email: string) {
    return this.http.put(`${ENDPOINT}/api/reset`, email) as Observable<{
      message: string;
    }>;
  }
}
