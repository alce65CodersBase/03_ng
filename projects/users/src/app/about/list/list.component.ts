import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
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

  handleDelete(id: number) {
    this.users = this.users.filter((item) => item.id !== id);
    console.log('Users after delete:', this.users);
  }

  handleChange(user: User) {
    this.users = this.users.map((item) => (item.id === user.id ? user : item));
    console.log('Users after update:', this.users);
  }

  handleAdd(user: User) {
    this.users.push(user);
    console.log('Users after add:', this.users);
  }
}
