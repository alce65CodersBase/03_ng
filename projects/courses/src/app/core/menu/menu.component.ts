import { Component, Input } from '@angular/core';
import { MenuOption } from '../../../types/menu';

@Component({
  selector: 'sdi-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() links!: MenuOption[];
}
