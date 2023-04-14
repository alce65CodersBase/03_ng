import { Component } from '@angular/core';
import { MenuOption } from '../types/menu';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'sdi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;
  links: MenuOption[];
  extraLinks: MenuOption[];
  constructor(public auth: AuthService) {
    this.title = 'Courses from Angular 13 Fundamentals';
    this.links = [
      { path: '/home', icon: 'home', title: 'Home' },
      { path: '/courses', icon: 'view_list', title: 'Courses' },
      {
        path: '/courses2',
        icon: 'view_list',
        title: 'Courses Multi Components',
      },
    ];

    this.extraLinks = [{ path: '/admin', icon: 'face', title: 'Admin' }];
  }
}
