import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserLogin } from 'projects/users/src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged$: BehaviorSubject<boolean>;
  userLogged$: BehaviorSubject<null>;
  userToken$: BehaviorSubject<string>;
  constructor(private http: HttpClient) {
    this.isLogged$ = new BehaviorSubject(false);
    this.userLogged$ = new BehaviorSubject(null);
    this.userToken$ = new BehaviorSubject('');
  }

  register(formData: FormData) {
    const apiUrl = environment.apiUrlBase + '/users/register';
    const upload$ = this.http.post(apiUrl, formData);
    upload$.subscribe((data) => console.log(data));
  }

  login(formData: FormData) {
    const data: UserLogin = {
      email: formData.get('email') as string,
      passwd: formData.get('passwd') as string,
    };
    const apiUrl = environment.apiUrlBase + '/users/login';
    const upload$ = this.http.post(apiUrl, data);
    upload$.subscribe((data: any) => {
      this.isLogged$.next(true);
      this.userLogged$.next(data.results[0]);
      this.userToken$.next(data.token);
      console.log(data);
    });
  }

  logout() {
    this.isLogged$.next(false);
    this.userLogged$.next(null);
    this.userToken$.next('');
  }
}
