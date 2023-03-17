import { Injectable } from '@angular/core';
import { User } from '../../../models/user.model';
import { HttpClient } from '@angular/common/http';

export const getUsers = async (): Promise<User[]> => [
  { id: 1, firstName: 'Pepe', surname: 'Foo', isAdmin: false },
  { id: 2, firstName: 'Ernestina', surname: 'Bar', isAdmin: false },
];

@Injectable({
  providedIn: 'root',
})
export class UsersRepoService {
  constructor(public http: HttpClient) {}

  createUser() {
    return this.http.post(
      '',
      {},
      {
        headers: {},
      }
    );
  }
}
