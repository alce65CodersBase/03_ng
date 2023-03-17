import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogged, UserLogin, UserRegister } from '../../models/user.model';
import { BehaviorSubject } from 'rxjs';
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
    return (userLogged as UserLogged).email !== undefined;
  }

  login(userLogin: UserLogin) {
    this.repo.sendLoginData(userLogin).subscribe({
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
