import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'projects/users/src/types/menu.item';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sdi-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Input() items!: MenuItem[];
}
