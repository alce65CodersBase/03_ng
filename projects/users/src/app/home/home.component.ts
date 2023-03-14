import { Component } from '@angular/core';
import { TasksService } from '../tasks/services/tasks.service';
@Component({
  selector: 'sdi-home',
  template: `
    <h1>Home</h1>
    <p>Tasks: {{ tasksNumber }}</p>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tasksNumber: number;
  constructor(public srv: TasksService) {
    this.tasksNumber = 0;
    this.srv.greetings();
    srv.tasks$.subscribe((data) => (this.tasksNumber = data.length));
  }
}
