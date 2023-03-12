import { Component } from '@angular/core';
import { MenuItems } from 'projects/users/src/types/menu.items';

@Component({
  selector: 'sdi-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  items: MenuItems[];
  constructor() {
    this.items = [
      { path: 'home', label: 'Inicio' },
      { path: 'tasks', label: 'Tareas' },
      { path: 'about', label: 'Nosotros' },
    ];
  }
}
