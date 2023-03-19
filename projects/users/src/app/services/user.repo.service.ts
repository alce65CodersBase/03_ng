import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserRepoService {
  apiUrl: string;
  constructor(public http: HttpClient) {
    this.apiUrl = '';
  }

  createRegister(userRegister: UserRegister) {
    return this.http.post(this.apiUrl + '/registration', userRegister);
  }

  sendLoginData(userLogin: UserLogin) {
    return this.http.post(this.apiUrl + '/login', userLogin);
  }
}
