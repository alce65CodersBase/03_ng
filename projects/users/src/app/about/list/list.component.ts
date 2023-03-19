import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'sdi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: User[];
  constructor(public srv: UsersService) {
    this.users = [];
  }

  async ngOnInit(): Promise<void> {
    this.srv.users$.subscribe((data) => {
      this.users = data;
      console.log('Users after load:', this.users);
    });
  }

  // El componente "controlador"
  // podría traerse los métodos del estado
  // y actuar como intermediario para los componentes presentadores
  // handleAdd(user: User) {
  //   this.srv.handleAdd(user);
  // }

  // handleDelete(id: number) {
  //   this.srv.handleDelete(id);
  // }

  // handleChange(user: User) {
  //   this.srv.handleChange(user);
  // }
}
