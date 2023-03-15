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
  // @Output() deleted: EventEmitter<number>;
  // @Output() changed: EventEmitter<User>;

  constructor(public srv: UsersService) {
    // this.deleted = new EventEmitter();
    // this.changed = new EventEmitter();
  }

  handleDelete() {
    console.log('Borrando', this.user.id);
    // this.deleted.next(this.user.id);
    this.srv.handleDelete(this.user.id);
  }

  handleChange() {
    this.user.isAdmin = !this.user.isAdmin;
    // this.changed.next(this.user);
    this.srv.handleChange(this.user);
  }
}
