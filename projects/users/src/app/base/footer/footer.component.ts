import { Component } from '@angular/core';

@Component({
  selector: 'sdi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  day = new Date();
}
