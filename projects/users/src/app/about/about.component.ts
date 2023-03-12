import { Component } from '@angular/core';
import { TasksService } from '../tasks/services/tasks.service';

@Component({
  selector: 'sdi-about',
  template: ` <p>about works!</p> `,
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(public srv: TasksService) {
    this.srv.greetings();
  }
}
