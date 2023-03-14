import { Component } from '@angular/core';
import { UsersService } from '../about/services/users.service';
import { HomeService } from './services/home.service';
@Component({
  selector: 'sdi-home',
  template: `
    <h1>Home</h1>
    <p>Users: {{ usersNumber }}</p>
    <p>Sample of a component included in a module imported from the library:</p>
    <sdi-core></sdi-core>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  usersNumber: number;
  constructor(public homeSrv: HomeService, public usersSrv: UsersService) {
    this.usersNumber = 0;
    this.homeSrv.greetings();
    usersSrv.users$.subscribe((data) => (this.usersNumber = data.length));
  }
}
