import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'sdi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() task!: Task;
  @Output() deleted: EventEmitter<number>;
  @Output() changed: EventEmitter<Task>;

  constructor() {
    this.deleted = new EventEmitter();
    this.changed = new EventEmitter();
  }

  handleDelete() {
    console.log('Borrando', this.task.id);
    this.deleted.next(this.task.id);
  }

  handleChange() {
    this.task.isCompleted = !this.task.isCompleted;
    this.changed.next(this.task);
  }
}
