import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'sdi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() user!: User;
  @Output() deleted: EventEmitter<number>;
  @Output() changed: EventEmitter<User>;

  constructor() {
    this.deleted = new EventEmitter();
    this.changed = new EventEmitter();
  }

  handleDelete() {
    console.log('Borrando', this.user.id);
    this.deleted.next(this.user.id);
  }

  handleChange() {
    this.user.isAdmin = !this.user.isAdmin;
    this.changed.next(this.user);
  }
}
