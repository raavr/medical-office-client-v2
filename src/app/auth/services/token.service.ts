import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_NAME = 'access_token';

  constructor() { }

  getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_NAME);
  }
}
