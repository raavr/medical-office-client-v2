import { Injectable } from '@angular/core';
import { Credentials } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { ENDPOINT } from 'src/app/app.constant';
import { SignupData } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: Credentials): Observable<Token> {
    return this.http.post(`${ENDPOINT}/auth/login`, credentials) as Observable<Token>;
  }

  signup(signupData: SignupData): Observable<{message: string}> {
    return this.http.post(`${ENDPOINT}/auth/signup`, signupData) as Observable<{message: string}>;
  }

}