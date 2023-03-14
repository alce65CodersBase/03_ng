import { Component } from '@angular/core';
import { MenuItem } from 'projects/core/src/lib/types/menu.item';

@Component({
  selector: 'sdi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string;
  brand: string;
  menuOptions: MenuItem[];
  constructor() {
    this.title = 'Angular samples: User';
    this.brand = 'ISDI Coders';
    this.menuOptions = [
      { path: 'home', label: 'Inicio' },
      { path: 'tasks', label: 'Tareas' },
      { path: 'about', label: 'Nosotros' },
    ];
  }
}
