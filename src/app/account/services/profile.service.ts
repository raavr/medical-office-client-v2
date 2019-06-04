import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from '../../app.constant';
import { User } from 'src/app/auth/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(ENDPOINT + '/api/profile') as Observable<User>;
  }

  updateProfile(profileData: User) {
    return this.http.put(ENDPOINT + '/api/profile', profileData) as Observable<{message: string}>;
  }

  uploadAvatar(avatarFile: FormData) {
    return this.http.post(ENDPOINT + '/api/avatar', avatarFile) as Observable<{avatar_url: string}>;
  }
}
