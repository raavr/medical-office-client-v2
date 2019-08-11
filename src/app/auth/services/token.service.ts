import { Injectable } from '@angular/core';
import { TOKEN_NAME } from '../constants/auth.constant';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken() {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_NAME);
  }
}
