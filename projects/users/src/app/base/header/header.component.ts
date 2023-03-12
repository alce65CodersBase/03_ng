import { Component } from '@angular/core';

@Component({
  selector: 'sdi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  tasksNumber: number;
  constructor() {
    this.tasksNumber = 0;
  }
}
