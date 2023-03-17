import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogged, UserLogin, UserRegister } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userLogged$: BehaviorSubject<UserLogged | null>;
  apiUrl: string;
  constructor(public http: HttpClient, public router: Router) {
    this.userLogged$ = new BehaviorSubject<UserLogged | null>(null);
    this.apiUrl = '';
  }

  loadProfile() {
    console.log('Handle Profile');
    this.router.navigateByUrl('user');
  }

  register(userRegister: UserRegister) {
    this.http.post(this.apiUrl + '/registration', userRegister).subscribe({
      next: () => console.log('Registration OK'),
      error: (err: Error) => console.error(err.message),
    });
  }

  private checkIsUserLogged(userLogged: unknown): userLogged is UserLogged {
    return (userLogged as UserLogged).email !== undefined;
  }

  login(userLogin: UserLogin) {
    this.http.post(this.apiUrl + '/login', userLogin).subscribe({
      next: (userLogged) => {
        if (!this.checkIsUserLogged(userLogged))
          throw new Error('Invalid data from server');
        this.userLogged$.next(userLogged);
        console.log('Logged', userLogged);
      },
      error: (err: Error) => console.error(err.message),
    });
  }

  logout() {
    this.userLogged$.next(null);
  }
}
