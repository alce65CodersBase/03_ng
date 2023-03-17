import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { getTasks } from '../services/mock.data';

@Component({
  selector: 'sdi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tasks: Task[];
  constructor() {
    this.tasks = [];
  }

  async ngOnInit(): Promise<void> {
    this.tasks = await getTasks();
    console.log('Tasks after load:', this.tasks);
  }

  handleDelete(id: number) {
    this.tasks = this.tasks.filter((item) => item.id !== id);
    console.log('Tasks after delete:', this.tasks);
  }

  handleChange(task: Task) {
    this.tasks = this.tasks.map((item) => (item.id === task.id ? task : item));
    console.log('Tasks after update:', this.tasks);
  }

  handleAdd(task: Task) {
    this.tasks.push(task);
    console.log('Tasks after add:', this.tasks);
  }
}
