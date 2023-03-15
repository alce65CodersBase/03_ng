import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'sdi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() user!: User;

  constructor(public srv: UsersService) {}

  handleDelete() {
    console.log('Borrando', this.user.id);
    this.srv.handleDelete(this.user.id);
  }

  handleChange() {
    this.user.isAdmin = !this.user.isAdmin;
    this.srv.handleChange(this.user);
  }
}
