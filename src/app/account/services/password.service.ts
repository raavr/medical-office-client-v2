import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { Observable } from 'rxjs';
import { Passwords } from '../model/passwords';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  constructor(private http: HttpClient) {}

  changePassword(passwords: Passwords) {
    return this.http.put(ENDPOINT + '/api/change_password', passwords) as Observable<{message: string}>;
  }

}
