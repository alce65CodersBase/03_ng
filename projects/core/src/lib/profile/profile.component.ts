import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sdi-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.svg',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @Input() handleProfile!: () => void;
  fillColor: string;
  height: string;
  width: string;
  constructor() {
    this.fillColor = 'bisque';
    this.height = '80px';
    this.width = '80px';
  }
  handleClick() {
    this.handleProfile();
  }
}
