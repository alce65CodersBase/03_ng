import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogged, UserLogin, UserRegister } from '../../models/user.model';
import { BehaviorSubject, map, throwError } from 'rxjs';
import { UserRepoService } from './user.repo.service';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  userLogged$: BehaviorSubject<UserLogged | null>;

  constructor(public repo: UserRepoService, public router: Router) {
    this.userLogged$ = new BehaviorSubject<UserLogged | null>(null);
  }

  loadProfile() {
    console.log('Handle Profile');
    this.router.navigateByUrl('user');
  }

  register(userRegister: UserRegister) {
    this.repo.createRegister(userRegister).subscribe({
      next: () => console.log('Registration OK'),
      error: (err: Error) => console.error(err.message),
    });
  }

  private checkIsUserLogged(userLogged: unknown): userLogged is UserLogged {
    console.log({ userLogged });
    return (userLogged as UserLogged).email !== undefined;
  }

  makeError() {
    return new Error('Invalid data from server');
  }

  login(userLogin: UserLogin) {
    this.repo
      .sendLoginData(userLogin)
      .pipe(
        map((data) => {
          if (!this.checkIsUserLogged(data)) return throwError(this.makeError);
          // El formato mas simple no permite testar la callback
          // return throwError(() => new Error('Invalid data from server'));
          return data;
        })
      )
      .subscribe({
        next: (userLogged) => {
          this.userLogged$.next(userLogged as UserLogged);
          console.log('Logged', userLogged);
        },
        error: (err: Error) => console.error(err.message),
      });
  }

  logout() {
    this.userLogged$.next(null);
  }
}
