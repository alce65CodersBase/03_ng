import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user.model';
import { getUsers } from './mock.data';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$: BehaviorSubject<User[]>;
  constructor() {
    const initialUsers: User[] = [];
    this.users$ = new BehaviorSubject(initialUsers);
    getUsers().then((users) => this.users$.next(users));
  }

  greetings() {
    console.log('Hola');
  }

  handleAdd(user: User) {
    this.users$.value.push(user);
    this.users$.next(this.users$.value);

    console.log(this.users$.value);
  }

  handleDelete(id: number) {
    const newValue = this.users$.value.filter((item) => item.id !== id);
    this.users$.next(newValue);
    console.log('Users after delete:', this.users$.value);
  }

  handleChange(user: User) {
    const newValue = this.users$.value.map((item) =>
      item.id === user.id ? user : item
    );
    this.users$.next(newValue);
    console.log('Users after update:', this.users$.value);
  }
}
