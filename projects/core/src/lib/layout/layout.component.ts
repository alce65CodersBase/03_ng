import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from '../menu/menu.component';
import { MenuItem } from '../types/menu.item';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'sdi-layout',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    ProfileComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  @Input() title!: string;
  @Input() brand!: string;
  @Input() menuOptions!: MenuItem[];
  @Input() handleProfile!: () => void;
}
