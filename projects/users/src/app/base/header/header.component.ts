import { Component } from '@angular/core';
import { TasksService } from '../../tasks/services/tasks.service';

@Component({
  selector: 'sdi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  tasksNumber: number;
  constructor(public srv: TasksService) {
    this.tasksNumber = 0;
    srv.tasks$.subscribe((data) => (this.tasksNumber = data.length));
  }
}
