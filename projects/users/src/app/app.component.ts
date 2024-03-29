import { Component } from '@angular/core';
import { MenuItem } from 'projects/core/src/lib/types/menu.item';
import { UserStateService } from './services/user.state.service';

@Component({
  selector: 'sdi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;
  brand: string;
  menuOptions: MenuItem[];
  constructor(private userSrv: UserStateService) {
    this.title = 'Angular samples: User';
    this.brand = 'ISDI Coders';
    this.menuOptions = [
      { path: 'home', label: 'Inicio' },
      { path: 'tasks', label: 'Tareas' },
      { path: 'about', label: 'Nosotros' },
    ];
    this.handleProfile = this.handleProfile.bind(this);
  }
  handleProfile() {
    this.userSrv.loadProfile();
  }
}
